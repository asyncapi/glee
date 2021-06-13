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
      const channelNames = this.parsedAsyncAPI.channelNames()
      const subscribedChannels = channelNames.filter(chan => this.parsedAsyncAPI.channel(chan).hasPublish())
      const serverBinding = this.AsyncAPIServer.binding('ws')
      const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
        const secName = Object.keys(sec.json())[0]
        return this.parsedAsyncAPI.components().securityScheme(secName)
      })
      const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
      const url = new URL(this.AsyncAPIServer.url())

      const serverOptions = {
        path: url.pathname || '/',
        serveClient: false,
        cors: {
          origin: true,
        }
      }

      if (this.glee.options.httpServer) {
        this.server = io(this.glee.options.httpServer, serverOptions)
      } else {
        this.server = new io.Server(serverOptions)
      }

      this.server.on('connect', (socket) => {
        this.emit('connect', { name: this.name(), adapter: this, connection: socket })

        socket.onAny((eventName, payload) => {
          const msg = this._createMessage(eventName, payload)
          this.emit('message', msg, socket)
        })
      })

      this.server.listen(url.port || 80)
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
