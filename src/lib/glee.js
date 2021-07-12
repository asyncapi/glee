import EventEmitter from 'events'
import async from 'async'
import Debug from 'debug'
import Adapter from './adapter.js'
import Router from './router.js'
import GleeMessage from './message.js'
import { matchChannel, duplicateMessage, getParams } from './util.js'

const debug = Debug('glee')

class Glee extends EventEmitter {
  /**
   * Instantiates Glee.
   *
   * @param {Object} [options={}]
   */
  constructor (options = {}) {
    super()

    this.options = options
    this.router = new Router()
    this.adapters = []
  }

  /**
   * Adds a connection adapter.
   *
   * @param {GleeAdapter} adapter The adapter.
   * @param {String} serverName The name of the AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIServer} server AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  addAdapter (Adapter, { serverName, server, parsedAsyncAPI }) {
    this.adapters.push({Adapter, serverName, server, parsedAsyncAPI})
  }

  /**
   * Use a middleware for inbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  use (...args) {
    this.router.use(...args)
  }

  /**
   * Use a middleware for outbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  useOutbound (...args) {
    this.router.useOutbound(...args)
  }

  /**
   * Send a message to the adapters.
   *
   * @param {Object|GleeMessage} message The payload of the message you want to send.
   */
  send (message) {
    message.setOutbound()

    this._processMessage(
      this.router.getOutboundMiddlewares(),
      this.router.getOutboundErrorMiddlewares(),
      message
    )
  }

  /**
   * Tells the adapters to connect.
   *
   * @return {Promise}
   */
  async connect () {
    const promises = []

    this.adapters.forEach(a => {
      a.instance = new a.Adapter(this, a.serverName, a.server, a.parsedAsyncAPI)
      promises.push(a.instance.connect())
    })

    return Promise.all(promises)
  }

  /**
   * Alias for `connect`.
   *
   * @return {Promise}
   */
  async listen () {
    return this.connect()
  }

  /**
   * Injects a message into the Glee inbound middleware chain.
   *
   * @param {GleeMessage} message The message you want to send.
   * @param {String} serverName The name of the server this message is coming from.
   * @param {Unknown} [connection] The connection used when receiving the message. Its type is unknown and must be handled by the adapters.
   */
  injectMessage (message, serverName, connection) {
    message.serverName = serverName
    message.connection = connection
    message.inbound = true
    message.outbound = false

    this._processMessage(
      this.router.getMiddlewares(),
      this.router.getErrorMiddlewares(),
      message
    )
  }

  /**
   * Injects an error into the Glee inbound error middleware chain.
   *
   * @param {Any} error The error.
   * @param {String} [channel] The channel of the error.
   */
  injectError (error, channel) {
    this._processError(
      this.router.getErrorMiddlewares(),
      error,
      { channel }
    )
  }

  /**
   * Starts executing the middlewares for the given message.
   *
   * @param {Array} middlewares The middleware chain to execute.
   * @param {Array} errorMiddlewares The middlewares chain to execute in case of error.
   * @param {GleeMessage} message The message to pass to the middlewares.
   * @private
   */
  _processMessage (middlewares, errorMiddlewares, message) {
    const mws =
      middlewares
        .filter(mw => matchChannel(mw.channel, message.channel))
        .map(mw => (msg, next) => {
          const msgForMiddleware = duplicateMessage(msg)
          msgForMiddleware.params = getParams(mw.channel, msgForMiddleware.channel)

          msgForMiddleware.on('send', (m) => {
            m.inbound = false
            m.outbound = true
            this._processMessage(
              this.router.getOutboundMiddlewares(),
              this.router.getOutboundErrorMiddlewares(),
              m
            )
          })

          mw.fn.call(mw.fn, msgForMiddleware, (err, newMessage) => {
            const nextMessage = newMessage || msgForMiddleware
            nextMessage.channel = message.channel // This is to avoid the channel to be modified.
            next(err, nextMessage)
          })
        })

    async.seq(...mws)(message, (err, msg) => {
      if (err) {
        this._processError(errorMiddlewares, err, msg)
        return
      }

      if (middlewares === this.router.getOutboundMiddlewares()) {
        debug('Outbound pipeline finished. Sending message...')
        debug(msg)
        this.adapters.forEach(a => {
          if (a.instance && (!msg.serverName || msg.serverName === a.serverName)) {
            a.instance.send(msg).catch((e) => {
              this._processError(errorMiddlewares, e, msg)
            })
          }
        })
      } else {
        debug('Inbound pipeline finished.')
      }
    })
  }

  /**
   * Starts executing the middlewares for the given error and message.
   *
   * @param {Array} errorMiddlewares The error middlewares chain to execute.
   * @param {Any} error The error to pass to the middleware.
   * @param {GleeMessage} message The message to pass to the middlewares.
   * @private
   */
  _processError (errorMiddlewares, error, message) {
    const emws = errorMiddlewares.filter(emw => matchChannel(emw.channel, message.channel))
    if (!emws.length) return

    this._execErrorMiddleware(emws, 0, error, message)
  }

  _execErrorMiddleware (emws, index, error, message) {
    emws[index].fn(error, message, (err) => {
      if (!emws[index+1]) return
      this._execErrorMiddleware.call(null, emws, index+1, err, message)
    })
  }
}

Glee.Message = GleeMessage
Glee.Adapter = Adapter
Glee.Router = Router

export default Glee
