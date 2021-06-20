import EventEmitter from 'events'

class GleeAdapter extends EventEmitter {
  /**
   * Instantiates a Glee adapter.
   *
   * @param {Glee} glee  A reference to the Glee app.
   * @param {String} serverName  The name of the AsyncAPI server to use for the connection.
   * @param {AsyncAPIServer} server  The AsyncAPI server to use for the connection.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  constructor (glee, serverName, server, parsedAsyncAPI) {
    super()

    this.glee = glee
    this.serverName = serverName
    this.AsyncAPIServer = server
    this.parsedAsyncAPI = parsedAsyncAPI
    this.connections = []

    this.on('error', err => { this.glee.injectError(err) })
    this.on('message', (message, connection) => { this.glee.injectMessage(message, serverName, connection) })

    function enrichEvent(ev) {
      return {
        ...ev,
        ...{
          serverName,
          server,
        }
      }
    }

    this.on('connect', (ev) => {
      this.glee.emit('adapter:connect', enrichEvent(ev))
    })
    
    this.on('ready', (ev) => {
      this.glee.emit('adapter:ready', enrichEvent(ev))
    })
    
    this.on('connection', (ev) => {
      this.connections.push({
        connection: ev.connection,
        channel: ev.channel,
      })

      this.glee.emit('adapter:connection', enrichEvent(ev))
    })

    this.on('reconnect', (ev) => {
      this.glee.emit('adapter:reconnect', enrichEvent(ev))
    })
    
    this.on('close', (ev) => {
      this.glee.emit('adapter:close', enrichEvent(ev))
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

export default GleeAdapter
