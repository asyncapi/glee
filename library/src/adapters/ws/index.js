const WebSocket = require('ws')
const http = require('http')
const path = require('path')
const Adapter = require('../../lib/adapter')
const Message = require('../../lib/message')

class SocketIOAdapter extends Adapter {
  name () {
    return 'WebSockets adapter'
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
      const serverUrl = new URL(this.AsyncAPIServer.url())
      const wsHttpServer = this.glee.options.wsHttpServer
      const asyncapiServerPort = serverUrl.port || 80
      
      if (wsHttpServer && String(wsHttpServer.address().port) !== String(asyncapiServerPort)) {
        console.error(`Your custom HTTP server is listening on port ${wsHttpServer.address().port} but your AsyncAPI file says it must listen on ${asyncapiServerPort}. Please fix the inconsistency.`)
        process.exit(1)
      }

      let server

      if (wsHttpServer) {
        server = new WebSocket.Server({ server: wsHttpServer })
      } else {
        server = new WebSocket.Server({
          port: asyncapiServerPort,
          host: serverUrl.hostname,
        })
      }

      server.on('connection', (socket) => {
        socket.on('message', (payload) => {
          let jsonPayload
          try {
            jsonPayload = JSON.parse(payload)
            const msg = this._createMessage(jsonPayload.type, jsonPayload.data)
            this.emit('message', msg, socket)
          } catch (e) {
            e.message = `Invalid JSON message received: ${e.message}`
            this.emit('error', e)
          }
        })

        this.emit('connect', { name: this.name(), adapter: this, connection: socket })
      })

      resolve(this)
    })
  }

  _send (message) {
    return new Promise((resolve, reject) => {
      try {
        message.connection.send(JSON.stringify({
          type: message.channel,
          data: message.payload,
        }))
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
