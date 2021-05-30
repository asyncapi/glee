const EventEmitter = require('events');
const async = require('async');
const debug = require('debug')('evolve');
const Adapter = require('./adapter');
const Router = require('./router');
const EvolveMessage = require('./message');
const util = require('./util');

class Evolve extends EventEmitter {
  /**
   * Instantiates Evolve.
   *
   * @param {Object} [options={}]
   * @param {String} [options.pathSeparator='/'] The character to use when joining paths.
   */
  constructor (options = {}) {
    super();

    const routerOptions = {};
    if (options.pathSeparator) routerOptions.pathSeparator = options.pathSeparator;

    this.router = new Router(routerOptions);
    this.adapters = [];
  }

  /**
   * Adds a connection adapter.
   *
   * @param {EvolveAdapter} adapter The adapter.
   * @param {Server} AsyncAPIServer AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  addAdapter (Adapter, AsyncAPIServer, parsedAsyncAPI) {
    this.adapters.push({Adapter, AsyncAPIServer, parsedAsyncAPI});
  }

  /**
   * Use a middleware for inbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|EvolveRouter} ...middlewares A function or EvolveRouter to use as a middleware.
   */
  use (...args) {
    this.router.use(...args);
  }

  /**
   * Use a middleware for outbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|EvolveRouter} ...middlewares A function or EvolveRouter to use as a middleware.
   */
  useOutbound (...args) {
    this.router.useOutbound(...args);
  }

  /**
   * Send a message to the adapters.
   *
   * @param {Object|EvolveMessage} message The payload of the message you want to send.
   * @param {Any} [headers] The headers of the message you want to send.
   * @param {String} [channel] The channel in which you want to send the message.
   */
  send (payload, headers, channel) {
    let message;

    if (payload.__isEvolveMessage) {
      message = payload;
      channel = payload.channel;
    } else {
      message = util.createMessage(this, payload, headers, channel);
    }

    message.inbound = false;
    message.outbound = true;

    this._processMessage(
      this.router.getOutboundMiddlewares(),
      this.router.getOutboundErrorMiddlewares(),
      message
    );
  }

  /**
   * Tells the adapters to connect.
   *
   * @return {Promise}
   */
  async connect () {
    const promises = [];

    this.adapters.forEach(a => {
      a.instance = new a.Adapter(this, a.AsyncAPIServer, a.parsedAsyncAPI);
      promises.push(a.instance.connect());
    });

    return Promise.all(promises);
  }

  /**
   * Alias for `connect`.
   *
   * @return {Promise}
   */
  async listen () {
    return this.connect();
  }

  /**
   * Injects a message into the Evolve inbound middleware chain.
   *
   * @param {Object|EvolveMessage} message The payload of the message you want to send.
   * @param {Any} [headers] The headers of the message you want to send.
   * @param {String} [channel] The channel of the message.
   */
  injectMessage (payload, headers, channel) {
    let message;

    if (payload.__isEvolveMessage) {
      message = payload;
      channel = payload.channel;
    } else {
      message = util.createMessage(this, payload, headers, channel);
    }

    message.inbound = true;
    message.outbound = false;

    this._processMessage(
      this.router.getMiddlewares(),
      this.router.getErrorMiddlewares(),
      message
    );
  }

  /**
   * Injects an error into the Evolve inbound error middleware chain.
   *
   * @param {Any} error The error.
   * @param {String} [channel] The channel of the error.
   */
  injectError (error, channel) {
    this._processError(
      this.router.getErrorMiddlewares(),
      error,
      { channel }
    );
  }

  /**
   * Starts executing the middlewares for the given message.
   *
   * @param {Array} middlewares The middleware chain to execute.
   * @param {Array} errorMiddlewares The middlewares chain to execute in case of error.
   * @param {EvolveMessage} message The message to pass to the middlewares.
   * @private
   */
  _processMessage (middlewares, errorMiddlewares, message) {
    const mws =
      middlewares
        .filter(mw => util.matchchannel(mw.channel, message.channel))
        .map(mw => (msg, next) => {
          const msgForMiddleware = util.duplicateMessage(msg);
          msgForMiddleware.params = util.getParams(mw.channel, msgForMiddleware.channel);

          msgForMiddleware.on('send', (m) => {
            m.inbound = false;
            m.outbound = true;
            this._processMessage(
              this.router.getOutboundMiddlewares(),
              this.router.getOutboundErrorMiddlewares(),
              m
            );
          });

          mw.fn.call(mw.fn, msgForMiddleware, (err, newMessage) => {
            const nextMessage = newMessage || msgForMiddleware;
            nextMessage.channel = message.channel; // This is to avoid the channel to be modified.
            next(err, nextMessage);
          } );
        });

    async.seq(...mws)(message, (err, msg) => {
      if (err) {
        this._processError(errorMiddlewares, err, msg);
        return;
      }

      if (middlewares === this.router.getOutboundMiddlewares()) {
        debug('Outbound pipeline finished. Sending message...');
        debug(msg);
        this.adapters.forEach(a => {
          if (a.instance) {
            a.instance.send(msg).catch((e) => {
              this._processError(errorMiddlewares, e, msg);
            });
          }
        });
      } else {
        debug('Inbound pipeline finished.');
      }
    });
  }

  /**
   * Starts executing the middlewares for the given error and message.
   *
   * @param {Array} errorMiddlewares The error middlewares chain to execute.
   * @param {Any} error The error to pass to the middleware.
   * @param {EvolveMessage} message The message to pass to the middlewares.
   * @private
   */
  _processError (errorMiddlewares, error, message) {
    const emws = errorMiddlewares.filter(emw => util.matchchannel(emw.channel, message.channel));
    if (!emws.length) return;

    this._execErrorMiddleware(emws, 0, error, message);
  }

  _execErrorMiddleware (emws, index, error, message) {
    emws[index].fn(error, message, (err) => {
      if (!emws[index+1]) return;
      this._execErrorMiddleware.call(null, emws, index+1, err, message);
    });
  }
}

Evolve.Message = EvolveMessage;
Evolve.Adapter = Adapter;
Evolve.Router = Router;

module.exports = Evolve;
