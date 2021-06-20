import EventEmitter from 'events'

class GleeMessage extends EventEmitter {
  /**
   * Instantiates a new GleeMessage.
   *
   * @param {Object} options
   * @param {Any} [options.payload] Message payload.
   * @param {Object} [options.headers] Message headers.
   * @param {String} [options.channel] Message channel.
   * @param {String} [options.serverName] The name of the associated AsyncAPI server.
   * @param {Any} [options.connection] The connection through which the message will be sent or has been received.
   * @param {Boolean} [options.broadcast=false] Whether the message should be broadcasted or not.
   */
  constructor ({
    payload,
    headers,
    channel,
    serverName,
    connection,
    broadcast = false,
  }) {
    super()

    if (payload) this.payload = payload
    if (headers) this.headers = headers
    if (channel) this.channel = channel
    if (serverName) this.serverName = serverName
    if (connection) this.connection = connection
    if (broadcast) this.broadcast = !!broadcast

    this.__isGleeMessage = true
  }

  /**
   * Sends the message back to the server/broker.
   *
   * @param {Object} options
   * @param {Any} [options.payload] The new message payload. Pass falsy value if you don't want to change it.
   * @param {Object|null} [options.headers] The new message headers. Pass null if you want to remove them.
   * @param {String} [options.channel] The channel where the reply should go to.
   */
  reply ({ payload, headers, channel }) {
    if (payload) this.payload = payload

    if (headers !== undefined) {
      if (headers === null) {
        this.headers = undefined
      } else {
        this.headers = headers
      }
    }

    if (channel !== undefined) {
      if (typeof channel === 'string') {
        this.channel = channel
      } else {
        return console.error('GleeMessage.reply(): when specified, "channel" must be a string.')
      }
    }

    this.send()
  }

  /**
   * Makes the message suitable only for the inbound pipeline.
   */
  setInbound() {
    this.inbound = true
    this.outbound = false
  }
  
  /**
   * Makes the message suitable only for the outbound pipeline.
   */
  setOutbound() {
    this.inbound = false
    this.outbound = true
  }

  /**
   * Tells Glee to send the message.
   */
  send () {
    this.emit('send', this)
  }
}

export default GleeMessage
