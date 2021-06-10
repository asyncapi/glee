const EventEmitter = require('events')

class GleeAdapter extends EventEmitter {
  /**
   * Instantiates a Glee adapter.
   *
   * @param {Glee} glee  A reference to the Glee app.
   * @param {Server} AsyncAPIServer  The AsyncAPI server object.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  constructor (glee, AsyncAPIServer, parsedAsyncAPI) {
    super()

    this.glee = glee
    this.AsyncAPIServer = AsyncAPIServer
    this.parsedAsyncAPI = parsedAsyncAPI

    this.on('error', err => { this.glee.injectError(err) })
    this.on('message', message => { this.glee.injectMessage(message) })

    this.on('connect', (...args) => {
      this.glee.emit('adapter:connect', ...args)
    })
  }

  /**
   * Connects to the remote server.
   *
   * @return {Promise}
   */
  async connect () {
    throw new Error('Method `connect` is not implemented.')
  }

  /**
   * Sends a message to the remote server.
   *
   * @param {GleeMessage} message The message to send.
   * @return {Promise}
   */
  async send (message) {
    throw new Error('Method `send` is not implemented.')
  }
}

module.exports = GleeAdapter
