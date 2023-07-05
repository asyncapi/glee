import WebSocket from 'ws'
import http from 'http'
import { validateData } from '../../lib/util.js'
import Adapter from '../../lib/adapter.js'
import GleeConnection from '../../lib/connection.js'
import GleeMessage from '../../lib/message.js'
import GleeError from '../../errors/glee-error.js'

type QueryData = {
  searchParams: URLSearchParams
  query: any
}

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

  private emitPathnameError(socket, pathname: string) {
    socket.end('HTTP/1.1 404 Not Found\r\n\r\n')
    const err = new Error(
      `A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file.`
    )
    this.emit('error', err)
    throw err
  }

  private emitGleeError(socket, options) {
    const err = new GleeError(options)
    this.emit('error', err)
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
  }

  private checkQuery(queryData: QueryData) {
    const { searchParams, query } = queryData

    const queryParams = new Map()
    searchParams.forEach((value, key) => {
      queryParams.set(key, value)
    })

    return validateData(Object.fromEntries(queryParams.entries()), query)
  }

  private checkHeaders(requestDetails) {
    const { request, headers } = requestDetails
    return validateData(request.headers, headers)
  }

  private initializeServerEvents(serverData) {
    const { servers, ws, pathname, request } = serverData

    servers.get(pathname).emit('connect', ws, request)

    ws.on('message', (payload) => {
      const msg = this._createMessage(pathname, payload)
      this.emit('message', msg, ws)
    })

    this.emit('server:connection:open', {
      name: this.name(),
      adapter: this,
      connection: ws,
      channel: pathname,
      request,
    })
  }

  private pathnameChecks(socket, pathname: string, serverOptions) {
    const { serverUrl, servers } = serverOptions

    if (
      !pathname.startsWith(serverUrl.pathname) &&
      !pathname.startsWith(`/${serverUrl.pathname}`)
    ) {
      this.emitPathnameError(socket, pathname)
    }

    if (serverUrl.pathname !== '/') {
      pathname = pathname.substring(serverUrl.pathname.length)
    }

    // If pathname is /something but AsyncAPI file says the channel name is "something"
    // then we convert pathname to "something".
    if (
      pathname.startsWith('/') &&
      !servers.has(pathname) &&
      servers.has(pathname.substring(1))
    ) {
      pathname = pathname.substring(1)
    }

    if (!this.parsedAsyncAPI.channel(pathname)) {
      this.emitPathnameError(socket, pathname)
    }

    return pathname
  }

  private portChecks(portOptions) {
    const { port, config, optionsPort, wsHttpServer } = portOptions

    const checkWrongPort =
      !optionsPort &&
      config?.httpServer &&
      String(wsHttpServer.address().port) !== String(port)

    if (checkWrongPort) {
      console.error(
        `Your custom HTTP server is listening on port ${
          wsHttpServer.address().port
        } but your AsyncAPI file says it must listen on ${port}. Please fix the inconsistency.`
      )
      process.exit(1)
    }
  }

  private async initializeConstants() {
    const config = this.glee.options?.ws?.server
    const serverUrl = new URL(this.serverUrlExpanded)
    const wsHttpServer = config?.httpServer || http.createServer()
    const asyncapiServerPort = serverUrl.port || 80
    const optionsPort = config?.port
    const port = optionsPort || asyncapiServerPort

    return {
      config,
      serverUrl,
      wsHttpServer,
      asyncapiServerPort,
      optionsPort,
      port,
    }
  }

  private checkBindings(socket, bindingOpts) {
    const { wsChannelBinding, request, searchParams } = bindingOpts

    const { query, headers } = wsChannelBinding
    if (query) {
      const { isValid, humanReadableError, errors } = this.checkQuery({
        searchParams,
        query,
      })

      if (!isValid) {
        this.emitGleeError(socket, { humanReadableError, errors })
        return false
      }
    }

    if (headers) {
      const { isValid, humanReadableError, errors } = this.checkHeaders({
        request,
        headers,
      })
      if (!isValid) {
        this.emitGleeError(socket, { humanReadableError, errors })
        return false
      }
    }

    return true
  }

  async _connect(): Promise<this> {
    const { config, serverUrl, wsHttpServer, optionsPort, port } =
      await this.initializeConstants()

    this.portChecks({ port, config, optionsPort, wsHttpServer })

    const servers = new Map()
    this.channelNames.forEach((channelName) => {
      servers.set(channelName, new WebSocket.Server({ noServer: true }))
    })

    wsHttpServer.on('upgrade', (request, socket, head) => {
      let { pathname } = new URL(request.url, `ws://${request.headers.host}`)

      pathname = this.pathnameChecks(socket, pathname, { serverUrl, servers })

      const { searchParams } = new URL(
        request.url,
        `ws://${request.headers.host}`
      )
      const wsChannelBinding = this.parsedAsyncAPI
        .channel(pathname)
        .binding('ws')

      if (wsChannelBinding) {
        const correctBindings = this.checkBindings(socket, {
          wsChannelBinding,
          request,
          searchParams,
        })
        if (!correctBindings) return
      }

      if (servers.has(pathname)) {
        servers.get(pathname).handleUpgrade(request, socket, head, (ws) => {
          this.initializeServerEvents({ servers, ws, pathname, request })
        })
      } else {
        socket.destroy()
      }
    })

    if (!config?.httpServer) {
      wsHttpServer.listen(port)
    }

    this.emit('server:ready', { name: this.name(), adapter: this })

    return this
  }

  async _send(message: GleeMessage): Promise<void> {
    if (message.broadcast) {
      this.glee.syncCluster(message)

      this.connections
        .filter(({ channels }) => channels.includes(message.channel))
        .forEach((connection) => {
          connection.getRaw().send(message.payload)
        })
    } else {
      if (!message.connection)
        {throw new Error(
          'There is no WebSocket connection to send the message yet.'
        )}
      if (!(message.connection instanceof GleeConnection))
        {throw new Error('Connection object is not of GleeConnection type.')}
      message.connection.getRaw().send(message.payload)
    }
  }

  _createMessage(eventName: string, payload: any): GleeMessage {
    return new GleeMessage({
      payload,
      channel: eventName,
    })
  }
}

export default WebSocketsAdapter
