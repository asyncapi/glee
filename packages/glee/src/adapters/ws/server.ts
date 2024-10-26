import WebSocket from 'ws'
import http, { IncomingMessage, Server as HttpServer } from 'http'
import type { Duplex } from 'stream'
import { validateData } from '../../lib/util.js'
import Adapter, { GleeAdapterOptions } from '../../lib/adapter.js'
import GleeConnection from '../../lib/connection.js'
import GleeMessage from '../../lib/message.js'
import GleeAuth from '../../lib/wsHttpAuth.js'
import { WebsocketServerAdapterConfig } from '../../lib/index.js'
import * as url from 'url'
class WebSocketsAdapter extends Adapter {

  private config: WebsocketServerAdapterConfig
  private serverUrl: URL
  private wsHttpServer: HttpServer
  private customHttpServer: HttpServer
  // WebSockets are limited to a single connection path per server. To accommodate multiple channels, we instantiate a separate server for each channel and maintain a record of these servers here.
  private websocketServers: Map<string, WebSocket.Server>


  constructor(options: GleeAdapterOptions) {
    super(options)
    this.config = this.glee.options?.ws?.server
    this.customHttpServer = this.config?.httpServer
    this.wsHttpServer = this.customHttpServer || http.createServer()
    this.serverUrl = new URL(this.serverUrlExpanded)
    this.websocketServers = new Map()

  }

  name(): string {
    return 'WebSockets adapter'
  }

  async connect(): Promise<this> {
    try {
      await this._connect()
      return this
    } catch (e) {
      const errorMessage = `Unable to connect to ${this.name()}: ${e.message}`
      this.emit('error', new Error(errorMessage))
    }
  }

  private _createServers() {
    const gleeAuth = new GleeAuth(
      this.AsyncAPIServer,
      this.parsedAsyncAPI,
      this.serverName
    )
    const verifyClient = gleeAuth.checkAuthPresense()
      ? (info, cb) => {
        this._verifyClientFunc(gleeAuth, info, cb)
      }
      : null

    this.channelNames.forEach((channelName) => {
      this.websocketServers.set(
        channelName,
        new WebSocket.Server({
          noServer: true,
          verifyClient
        })
      )
    })
  }

  private async _connect(): Promise<this> {
    this._validatePort()
    this._createServers()

    this.wsHttpServer.on('upgrade', (request: IncomingMessage, socket: Duplex, head: Buffer) => {
      try {
        this._handleRequest(request, socket, head)
      } catch (e) {
        const errorMessage = `Error handling request: ${e.message}`
        this.emit('error', new Error(errorMessage))
        if (!socket.writableEnded) this._endRequest(500, 'Internal Server Error', socket)
      }
    })

    if (!this.customHttpServer) {
      this.wsHttpServer.listen(this._getPort())
    }

    this.emit('server:ready', { name: this.name(), adapter: this })
    return this
  }

  private _getPort() {
    const configPort = this.config?.port
    return configPort ? configPort : this.serverUrl.port
  }

  private _getChannel(req: IncomingMessage) {
    const pathName = this._extractPathname(req)
    return this.parsedAsyncAPI.channels().all().filter(channel => {
      let address = channel.address()
      if (address.endsWith('/')) address = address.substring(0, address.length - 1)

      return address === pathName
    })[0]
  }

  private _endRequest(code: number, message: string, socket: Duplex) {
    socket.end(`HTTP/1.1 ${code} ${message}\r\n\r\n`)
  }

  private _handleInvalidChannel(res: Duplex, pathName: string) {
    this._endRequest(404, "Channel Not Found", res)
    const errorMessage = `A client tried to connect to ${pathName}, but this path is not defined in your AsyncAPI file.`
    throw new Error(errorMessage)
  }

  private _validateRequest(request: IncomingMessage, socket: Duplex) {
    const pathName = this._extractPathname(request)
    const channel = this._getChannel(request)
    if (!channel) {
      this._handleInvalidChannel(socket, pathName)
    }
    this._validateRequestAgainstBindings(request, socket)
  }

  private _validateRequestAgainstBindings(req: IncomingMessage, socket: Duplex) {
    const channel = this._getChannel(req)
    const channelBindings = channel.bindings().get("ws")
    if (!channelBindings) return
    this._validateMethod(req, socket, channelBindings)
    this._validateQueries(req, socket, channelBindings)
    this._validateHeaders(req, socket, channelBindings)
  }

  private _validateHeaders(req: IncomingMessage, socket: Duplex, channelBindings) {

    const schema = channelBindings.headers
    if (!schema) return
    const headers = req.headers

    const { isValid, humanReadableError } = validateData(
      headers,
      schema
    )

    if (!isValid) {
      this._endRequest(400, "Bad Request", socket)
      const message = `Header validation failed: ${humanReadableError}. Please ensure that the headers match the expected format and types defined in the schema.`
      throw new Error(message)
    }
  }

  private _validateQueries(req: IncomingMessage, socket: Duplex, channelBindings) {
    const schema = channelBindings.query
    if (!schema) return
    const { query } = url.parse(req.url, true)
    const { isValid, humanReadableError } = validateData(
      query,
      schema
    )
    if (!isValid) {
      this._endRequest(400, 'Bad Request', socket)
      const message = `Query validation failed: ${humanReadableError}. Please ensure that the query parameters match the expected format and types defined in the schema.`
      throw new Error(message)
    }

  }

  private _validateMethod(req: IncomingMessage, socket: Duplex, channelBindings): void {
    const validMethod = channelBindings?.method?.toLowerCase()
    if (!validMethod) return
    if (validMethod !== req.method?.toLowerCase()) {
      this._endRequest(405, 'Method Not Allowed', socket)
      throw new Error(`Invalid Request Method: '${req.method}'. Allowed method for this channel: ${validMethod}`)
    }
  }

  private _handleRequest(request: IncomingMessage, socket: Duplex, head: Buffer) {
    this._validateRequest(request, socket)
    const channelId = this._getChannel(request).id()
    const server = this.websocketServers.get(channelId)
    if (!server) socket.destroy()

    this.websocketServers.get(channelId).handleUpgrade(request, socket, head, (ws) => {
      this._initializeServerEvents({ server, ws, request })
    })
  }


  private _extractPathname(req: IncomingMessage) {
    const serverUrl = new URL(this.serverUrlExpanded)
    const { pathname } = new URL(req.url, serverUrl)

    if (!pathname) return '/'

    if (pathname.endsWith('/')) {
      return pathname.substring(0, pathname.length - 1)
    }

    return pathname
  }


  private _initializeServerEvents({ server, ws, request }) {
    const channelId = this._getChannel(request).id()
    server.emit('connect', ws, request)
    ws.on('message', (payload) => {
      const msg = this._createMessage(channelId, payload)
      this.emit('message', msg, ws)
    })

    this.emit('server:connection:open', {
      name: this.name(),
      adapter: this,
      connection: ws,
      channel: channelId,
      request,
    })
  }

  private _validatePort() {
    const customServer = this.config?.httpServer
    if (!customServer) return

    const customServerPort = String(customServer.address().port)
    if (customServerPort !== this._getPort()) {
      throw new Error(
        `Your custom HTTP server is listening on port ${customServerPort} but your AsyncAPI or config file says it must listen on ${this._getPort()}. Please fix the inconsistency.`
      )
    }
  }

  private _wrapCallbackDecorator(cb) {
    return function done(val: boolean) {
      cb(val)
      if (val === false) {
        const err = new Error("401, Unauthorized")
        this.emit('error', err)
      }
    }
  }

  private _verifyClientFunc(gleeAuth, info, cb) {
    const authProps = gleeAuth.getServerAuthProps(info.req.headers, {})
    const done = this._wrapCallbackDecorator(cb).bind(this)
    this.emit('auth', {
      authProps,
      server: this.serverName,
      done,
      doc: this.AsyncAPIServer,
    })
  }


  async send(message: GleeMessage): Promise<void> {
    try {
      return this._send(message)
    } catch (e) {
      const errorMessage = `Error sending message: ${e.message}. Check message validity and connection status.`
      this.emit("error", new Error(errorMessage))
    }
  }

  private _handleBroadcastMessage(message: GleeMessage) {
    this.glee.syncCluster(message)

    this.connections
      .filter(({ channels }) => channels.includes(message.channel))
      .forEach((connection) => {
        connection.getRaw().send(message.payload)
      })
  }

  private _validateDirectMessage(message: GleeMessage) {
    if (!message.connection) {
      throw new Error('No WebSocket connection available for sending the message.')
    }
    if (!(message.connection instanceof GleeConnection)) {
      throw new Error('The connection object is not a valid GleeConnection instance.')
    }
  }

  private _handleDirectMessage(message: GleeMessage) {
    this._validateDirectMessage(message)
    message.connection.getRaw().send(message.payload)
  }

  private _send(message: GleeMessage) {
    if (message.broadcast) {
      this._handleBroadcastMessage(message)
    } else {
      this._handleDirectMessage(message)
    }
  }

  private _createMessage(eventName: string, payload: any): GleeMessage {
    return new GleeMessage({
      payload,
      channel: eventName,
    })
  }
}

export default WebSocketsAdapter
