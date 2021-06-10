const EventEmitter = require('events');

class GleeMessage extends EventEmitter {
  /**
   * Instantiates a new GleeMessage.
   *
   * @param {Glee} glee A reference to the Glee app.
   * @param {Any} [payload] Message payload.
   * @param {Any} [headers] Message headers.
   * @param {String} [channel] Message channel.
   */
  constructor (glee, payload, headers, channel) {
    super();

    this.glee = glee;
    if (payload) this.payload = payload;
    if (headers) this.headers = headers;
    if (channel) this.channel = channel;

    this.__isGleeMessage = true;
  }

  /**
   * Sends the message back to the server/broker.
   *
   * @param {Any} [payload] The new message payload. Pass falsy value if you don't want to change it.
   * @param {Any} [headers] The new message headers. Pass null if you want to remove them.
   * @param {String|null} [channel] The new message channel. Pass `null` if you want to remove the current channel.
   */
  reply (payload, headers, channel) {
    if (payload) this.payload = payload;

    if (headers !== undefined) {
      if (headers === null) {
        this.headers = undefined;
      } else {
        this.headers = headers;
      }
    }

    if (channel !== undefined) {
      if (channel === null) {
        this.channel = undefined;
      } else if (typeof channel === 'string') {
        this.channel = channel;
      } else {
        return console.error('GleeMessage.reply(payload, headers, channel): channel must be a string or null.');
      }
    }

    this.send();
  }

  /**
   * Tells Glee to send the message to all the adapters.
   */
  send () {
    this.emit('send', this);
  }
}

module.exports = GleeMessage;
