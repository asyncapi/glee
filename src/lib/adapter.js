import EventEmitter from 'events'
import GleeConnection from './connection.js'

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
    this.on('message', (message, connection) => {
      const conn = new GleeConnection({
        connection,
        channels: this.connections.find(c => c.rawConnection === connection).channels,
        serverName,
        server,
        parsedAsyncAPI,
      })
      this.glee.injectMessage(message, serverName, conn)
    })

    function enrichEvent(ev) {
      return {
        ...ev,
        ...{
          serverName,
          server,
        }
      }
    }

    function createConnection(ev) {
      let channels = ev.channels
      if (!channels && ev.channel) channels = [ev.channel]

      return new GleeConnection({
        connection: ev.connection,
        channels,
        serverName,
        server,
        parsedAsyncAPI,
      })
    }

    this.on('connect', (ev) => {
      const conn = createConnection(ev)
      this.connections.push(conn)

      this.glee.emit('adapter:connect', enrichEvent({
        connection: conn,
      }))
    })
    
    this.on('server:ready', (ev) => {
      this.glee.emit('adapter:server:ready', enrichEvent(ev))
    })
    
    this.on('server:connection:open', (ev) => {
      const conn = createConnection(ev)
      this.connections.push(conn)

      this.glee.emit('adapter:server:connection:open', enrichEvent({
        connection: conn,
      }))
    })

    this.on('reconnect', (ev) => {
      const conn = createConnection(ev)

      this.glee.emit('adapter:reconnect', enrichEvent({
        connection: conn,
      }))
    })
    
    this.on('close', (ev) => {
      const conn = createConnection(ev)
      
      this.glee.emit('adapter:close', enrichEvent({
        connection: conn,
      }))
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
