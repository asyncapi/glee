import WebSocket from 'ws'
import http from 'http'
import { validateData } from '../../lib/util.js'
import Adapter from '../../lib/adapter.js'
import GleeConnection from '../../lib/connection.js'
import GleeMessage from '../../lib/message.js'
import GleeError from '../../errors/glee-error.js'

class WebSocketsAdapter extends Adapter {
  name(): string {
    return 'WebSockets adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message)
  }

  async _connect(): Promise<this> { // NOSONAR
    const config = await this.resolveProtocolConfig('websocket')
    const websocketOptions = config?.server
    const serverUrl = new URL(this.serverUrlExpanded)
    const wsHttpServer = websocketOptions?.httpServer || http.createServer()
    const asyncapiServerPort = serverUrl.port || 80
    const optionsPort = websocketOptions?.port
    const port = optionsPort || asyncapiServerPort

    if (!optionsPort && websocketOptions?.httpServer && String(wsHttpServer.address().port) !== String(port)) {
      console.error(`Your custom HTTP server is listening on port ${wsHttpServer.address().port} but your AsyncAPI file says it must listen on ${port}. Please fix the inconsistency.`)
      process.exit(1)
    }

    const servers = new Map()
    this.channelNames.forEach(channelName => {
      servers.set(channelName, new WebSocket.Server({ noServer: true }))
    })

    wsHttpServer.on('upgrade', (request, socket, head) => {
      let { pathname } = new URL(request.url, `ws://${request.headers.host}`)

      if (!pathname.startsWith(serverUrl.pathname) && !pathname.startsWith(`/${serverUrl.pathname}`)) {
        socket.end('HTTP/1.1 404 Not Found\r\n\r\n')
        const err = new Error(`A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file.`)
        this.emit('error', err)
        throw err
      }

      if (serverUrl.pathname !== '/') {
        pathname = pathname.substring(serverUrl.pathname.length)
      }

      // If pathname is /something but AsyncAPI file says the channel name is "something"
      // then we convert pathname to "something".
      if (pathname.startsWith('/') && !servers.has(pathname) && servers.has(pathname.substring(1))) {
        pathname = pathname.substring(1)
      }

      if (!this.parsedAsyncAPI.channel(pathname)) {
        socket.end('HTTP/1.1 404 Not Found\r\n\r\n')
        const err = new Error(`A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file.`)
        this.emit('error', err)
        throw err
      }

      const { searchParams } = new URL(request.url, `ws://${request.headers.host}`)
      const wsChannelBinding = this.parsedAsyncAPI.channel(pathname).binding('ws')

      if (wsChannelBinding) {
        const { query, headers } = wsChannelBinding
        if (query) {
          const queryParams = new Map()
          searchParams.forEach((value, key) => {
            queryParams.set(key, value)
          })
          const { isValid, humanReadableError, errors } = validateData(Object.fromEntries(queryParams.entries()), query)
          if (!isValid) {
            const err = new GleeError({ humanReadableError, errors })
            this.emit('error', err)
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
            return
          }
        }

        if (headers) {
          const { isValid, humanReadableError, errors } = validateData(request.headers, headers)
          if (!isValid) {
            const err = new GleeError({ humanReadableError, errors })
            this.emit('error', err)
            socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
            return
          }
        }
      }
      if (servers.has(pathname)) {
        servers.get(pathname).handleUpgrade(request, socket, head, (ws) => {
          servers.get(pathname).emit('connect', ws, request)
          
          ws.on('message', (payload) => {
            const msg = this._createMessage(pathname, payload)
            this.emit('message', msg, ws)
          })

          this.emit('server:connection:open', { name: this.name(), adapter: this, connection: ws, channel: pathname, request })
        })
      } else {
        socket.destroy()
      }
    })

    if (!websocketOptions?.httpServer) {
      wsHttpServer.listen(port)
    }

    this.emit('server:ready', { name: this.name(), adapter: this })

    return this
  }

  async _send(message: GleeMessage): Promise<void> {
    if (message.broadcast) {
      this.glee.syncCluster(message)

      this
        .connections
        .filter(({ channels }) => channels.includes(message.channel))
        .forEach((connection) => {
          connection.getRaw().send(message.payload)
        })
    } else {
      if (!message.connection) throw new Error('There is no WebSocket connection to send the message yet.')
      if (!(message.connection instanceof GleeConnection)) throw new Error('Connection object is not of GleeConnection type.')
      message.connection.getRaw().send(message.payload)
    }
  }

  _createMessage(eventName: string, payload: any): GleeMessage {
    return new GleeMessage({
      payload,
      channel: eventName
    })
  }
}

export default WebSocketsAdapter
