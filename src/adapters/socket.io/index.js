import { Server } from 'socket.io'
import Adapter from '../../lib/adapter.js'
import Message from '../../lib/message.js'
import GleeConnection from '../../lib/connection.js'

class SocketIOAdapter extends Adapter {
  name () {
    return 'Socket.IO adapter'
  }

  async connect () {
    return this._connect()
  }

  async send (message) {
    return this._send(message)
  }

  _connect () {
    return new Promise((resolve) => {
      const channelNames = this.parsedAsyncAPI.channelNames()
      const url = new URL(this.AsyncAPIServer.url())

      const serverOptions = {
        path: url.pathname || '/',
        serveClient: false,
        transports: ['websocket'],
      }

      if (this.glee.options.websocket.httpServer) {
        const server = this.glee.options.websocket.httpServer
        if (String(server.address().port) !== String(url.port)) {
          console.error(`Your custom HTTP server is listening on port ${server.address().port} but your AsyncAPI file says it must listen on ${url.port}. Please fix the inconsistency.`)
          process.exit(1)
        }
        this.server = new Server(server, serverOptions)
      } else {
        this.server = new Server({
          ...serverOptions,
          ...{
            cors: {
              origin: true,
            }
          }
        })
      }

      this.server.on('connect', (socket) => {
        this.emit('connect', { name: this.name(), adapter: this, connection: socket, channels: channelNames })

        socket.onAny((eventName, payload) => {
          const msg = this._createMessage(eventName, payload)
          this.emit('message', msg, socket)
        })
      })

      if (!this.glee.options.websocket.httpServer) {
        this.server.listen(url.port || 80)
      }
      resolve(this)
    })
  }

  _send (message) {
    return new Promise((resolve, reject) => {
      try {
        if (message.broadcast) {
          this
            .connections
            .filter(({ channels }) => channels.includes(message.channel))
            .forEach((connection) => {
              connection.getRaw().emit(message.channel, message.payload)
            })
        } else {
          if (!message.connection) throw new Error('There is no Socket.IO connection to send the message yet.')
          if (!(message.connection instanceof GleeConnection)) throw new Error('Connection object is not of GleeConnection type.')
          message.connection.getRaw().emit(message.channel, message.payload)
        }
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  _createMessage (eventName, payload) {
    return new Message({
      payload,
      channel: eventName
    })
  }
}

export default SocketIOAdapter
