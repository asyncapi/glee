const io = require('socket.io')
const Adapter = require('../../lib/adapter')
const Message = require('../../lib/message')

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
      const url = new URL(this.AsyncAPIServer.url())

      const serverOptions = {
        path: url.pathname || '/',
        serveClient: false,
        transports: ['websocket'],
      }

      if (this.glee.options.wsHttpServer) {
        const server = this.glee.options.wsHttpServer
        if (String(server.address().port) !== String(url.port)) {
          console.error(`Your custom HTTP server is listening on port ${server.address().port} but your AsyncAPI file says it must listen on ${url.port}. Please fix the inconsistency.`)
          process.exit(1)
        }
        this.server = io(server, serverOptions)
      } else {
        this.server = new io.Server({
          ...serverOptions,
          ...{
            cors: {
              origin: true,
            }
          }
        })
      }

      this.server.on('connect', (socket) => {
        this.emit('connect', { name: this.name(), adapter: this, connection: socket })

        socket.onAny((eventName, payload) => {
          const msg = this._createMessage(eventName, payload)
          this.emit('message', msg, socket)
        })
      })

      if (!this.glee.options.wsHttpServer) {
        this.server.listen(url.port || 80)
      }
      resolve(this)
    })
  }

  _send (message) {
    return new Promise((resolve, reject) => {
      try {
        message.connection.emit(message.channel, message.payload)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  _createMessage (eventName, payload) {
    return new Message(this.glee, payload, undefined, eventName)
  }
}

module.exports = SocketIOAdapter
