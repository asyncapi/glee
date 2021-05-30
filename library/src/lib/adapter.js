const EventEmitter = require('events')

class EvolveAdapter extends EventEmitter {
  /**
   * Instantiates a Evolve adapter.
   *
   * @param {Evolve} evolve  A reference to the Evolve app.
   * @param {Server} AsyncAPIServer  The AsyncAPI server object.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  constructor (evolve, AsyncAPIServer, parsedAsyncAPI) {
    super()

    this.evolve = evolve
    this.AsyncAPIServer = AsyncAPIServer
    this.parsedAsyncAPI = parsedAsyncAPI

    this.on('error', err => { this.evolve.injectError(err) })
    this.on('message', message => { this.evolve.injectMessage(message) })

    this.on('connect', (...args) => {
      this.evolve.emit('adapter:connect', ...args)
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
   * @param {EvolveMessage} message The message to send.
   * @return {Promise}
   */
  async send (message) {
    throw new Error('Method `send` is not implemented.')
  }
}

module.exports = EvolveAdapter
