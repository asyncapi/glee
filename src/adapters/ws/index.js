const WebSocket = require('ws')
const http = require('http')
const { validateData } = require('../../lib/util')
const Adapter = require('../../lib/adapter')
const Message = require('../../lib/message')

class WebSocketsAdapter extends Adapter {
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
      const wsHttpServer = this.glee.options?.websocket?.httpServer || http.createServer()
      const asyncapiServerPort = serverUrl.port || 80
      
      if (this.glee.options?.websocket?.httpServer && String(wsHttpServer.address().port) !== String(asyncapiServerPort)) {
        console.error(`Your custom HTTP server is listening on port ${wsHttpServer.address().port} but your AsyncAPI file says it must listen on ${asyncapiServerPort}. Please fix the inconsistency.`)
        process.exit(1)
      }

      let servers = {}
      channelNames.forEach(channelName => {
        servers[channelName] = new WebSocket.Server({ noServer: true })
      })

      wsHttpServer.on('upgrade', (request, socket, head) => {
        let { pathname } = new URL(request.url, `ws://${request.headers.host}`)

        // If pathname is /something but AsyncAPI file says the channel name is "something"
        // then we convert pathname to "something".
        if (pathname.startsWith('/') && !servers[pathname] && servers[pathname.substr(1)]) {
          pathname = pathname.substr(1)
        }

        const { searchParams } = new URL(request.url, `ws://${request.headers.host}`)
        const wsChannelBinding = this.parsedAsyncAPI.channel(pathname).binding('ws')

        if (wsChannelBinding) {
          const { query, headers } = wsChannelBinding
          if (query) {
            let queryParams = {}
            searchParams.forEach((value, key) => {
              queryParams[key] = value
            })
            const { isValid, humanReadableError } = validateData(queryParams, query)
            if (!isValid) {
              const err = new Error('Invalid query params. Check details below:')
              err.details = humanReadableError
              this.emit('error', err)
              socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
              return
            }
          }

          if (headers) {
            const { isValid, humanReadableError } = validateData(request.headers, headers)
            if (!isValid) {
              const err = new Error('Invalid headers. Check details below:')
              err.details = humanReadableError
              this.emit('error', err)
              socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
              return
            }
          }
        }
        
        if (servers[pathname]) {
          servers[pathname].handleUpgrade(request, socket, head, (ws) => {
            servers[pathname].emit('connection', ws, request)
            
            ws.on('message', (payload) => {
              const msg = this._createMessage(pathname, payload)
              this.emit('message', msg, ws)
            })

            this.emit('connection', { name: this.name(), adapter: this, connection: ws, channel: pathname })
          })
        } else {
          socket.destroy()
        }
      })

      if (!this.glee.options?.websocket?.httpServer) {
        wsHttpServer.listen(asyncapiServerPort)
      }
      
      this.emit('ready', { name: this.name(), adapter: this })
      
      resolve(this)
    })
  }

  _send (message) {
    return new Promise((resolve, reject) => {
      try {
        if (message.broadcast) {
          this
            .connections
            .filter(({channel}) => channel === message.channel)
            .forEach(({connection}) => {
              connection.send(message.payload)
            })
        } else {
          if (!message.connection) throw new Error('There is no WebSocket connection to send the message yet.')
          message.connection.send(message.payload)
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

module.exports = WebSocketsAdapter
