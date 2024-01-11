import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import http, { IncomingMessage, ServerResponse } from 'http'
import { StringDecoder } from 'string_decoder'
import { validateData } from '../../lib/util.js'
import * as url from 'url'
import GleeAuth from '../../lib/wsHttpAuth.js'
import { ChannelInterface } from '@asyncapi/parser'
import { logErrorLine } from '../../lib/logger.js'


class HttpAdapter extends Adapter {
  private httpResponses = new Map()

  name(): string {
    return 'HTTP server'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message)
  }

  async _readRequestBody(req: http.IncomingMessage): Promise<string> {
    return new Promise((resolve) => {
      const decoder = new StringDecoder("utf-8")
      let result = ""

      req.on('data', (chunk) => {
        result += decoder.write(chunk)
      })

      req.on('end', () => {
        result += decoder.end()
        resolve(result)
      })
    })
  }

  async _authenticateRequest(req: IncomingMessage, res: ServerResponse) {

    function done() {
      let resolveFunc, rejectFunc
      const promise = new Promise((resolve, reject) => {
        resolveFunc = resolve
        rejectFunc = reject
      })
      return {
        promise,
        done: (val: boolean) => {
          if (val) {
            resolveFunc(true)
          } else {
            rejectFunc({ code: 401, message: 'Unauthorized' })
          }
        },
      }
    }

    const gleeAuth = new GleeAuth(
      this.AsyncAPIServer,
      this.parsedAsyncAPI,
      this.serverName,
      req.headers
    )

    const { promise, done: callback } = done()
    try {
      if (!gleeAuth.checkAuthPresense()) return
      this.emit('auth', {
        authProps: gleeAuth.getServerAuthProps(
          req.headers,
          url.parse(req.url, true).query
        ),
        server: this.serverName,
        done: callback,
        doc: this.AsyncAPIServer,
      })
      await promise
    } catch (e) {
      res.statusCode = e.code
      res.end()
      this.emit('error', new Error(`${e.code} ${e.message}`))
      return
    }
  }

  _storeHttpResponse(res: ServerResponse) {
    this.httpResponses.set(this.serverName, res)
  }
  _extractPathname(req: IncomingMessage) {
    const serverUrl = new URL(this.serverUrlExpanded)
    let { pathname } = new URL(req.url, serverUrl)
    pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname
    return pathname || '/'
  }

  _getChannel(pathName: string) {
    return this.parsedAsyncAPI.channels().all().filter(channel => channel.address() === pathName)[0]
  }
  async _processIncomingRequest(req: IncomingMessage, res: ServerResponse, body: any) {
    this._storeHttpResponse(res)
    const pathName = this._extractPathname(req)
    const channel = this._getChannel(pathName)
    if (!channel) {
      this._handleInvalidChannel(res, pathName)
    }


    this._emitConnectionEvent(channel)
    this._emitMessageEvent(body, req.url, channel)

  }
  _emitMessageEvent(body: any, requestUrl: string, channel: ChannelInterface) {
    const { query } = url.parse(requestUrl, true)
    const searchParams = { query }

    const channelId = channel.id()
    const msg = this._createMessage(channelId, body, searchParams)

    this.emit('message', msg, http)
  }

  _emitConnectionEvent(channel: ChannelInterface) {
    this.emit('connect', {
      name: this.name(),
      adapter: this,
      connection: http,
      channel: channel.id(),
    })
  }

  _handleInvalidChannel(res: http.ServerResponse<http.IncomingMessage>, pathName: string) {
    this._endRequest(404, "Channel Not Found", res)
    const errorMessage = `A client sent a request to ${pathName} path, but this channel is not defined in your AsyncAPI file.`
    this.emit('error', new Error(errorMessage))
  }

  _getFullUrl(req: IncomingMessage) {
    const protocol = this.AsyncAPIServer.protocol
    const host = req.headers['host']
    const urlPath = req.url
    return `${protocol}://${host}${urlPath}`
  }

  _handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await this._authenticateRequest(req, res)
      const body = await this._readRequestBody(req)
      this._validateRequestAgainstBindings(req, res)
      await this._processIncomingRequest(req, res, body)
    } catch (e) {
      const method = req.method
      const url = req.url
      const serverName = this.name() // Assuming 'this.name' contains the server's name. Adjust as needed.
      const message = `Error occurred while processing ${method} request at ${url} on ${serverName}.`
      logErrorLine(message)
      logErrorLine(e.message)
      if (!res.writableEnded) this._endRequest(500, "Internal Server Error", res)
    }
  }

  async _connect(): Promise<this> {
    const config = await this.resolveProtocolConfig('http')
    const httpOptions = config?.server
    const httpServer = httpOptions?.httpServer || http.createServer()
    const asyncapiServerPort = new URL(this.serverUrlExpanded).port || 80
    const port = asyncapiServerPort
    httpServer.on('request', this._handleRequest)
    httpServer.listen(port)
    this.emit('server:ready', { name: this.name(), adapter: this })
    return this
  }
  _getOperationBindings(channel: ChannelInterface) {
    return channel.operations().filterByReceive().map(operation => operation.bindings().get("http")?.json())
  }
  _validateMethod(req: IncomingMessage, res: ServerResponse, operationsBindings): void {
    const validMethods = new Set(operationsBindings
      .map(operationBindings => operationBindings.method?.toLowerCase()))
    if (!validMethods.has(req.method?.toLowerCase())) {
      this._endRequest(405, 'Method Not Allowed', res)
      throw new Error(`Invalid Request Method: '${req.method}'. Allowed methods for this channel: ${[...validMethods].join(', ')}`)
    }
  }
  _endRequest(code: number, message: string, res: ServerResponse) {
    res.statusCode = code
    res.end(message)
  }
  _validateQueries(req: IncomingMessage, res: ServerResponse, operationsBindings) {
    const querySchemas: any[] = operationsBindings
      .map(operationBindings => operationBindings.query)
      .filter(query => query != undefined)

    if (querySchemas.length < 1) return

    const schema = { anyOf: querySchemas }
    const { query } = url.parse(req.url, true)
    const { isValid, humanReadableError } = validateData(
      query,
      schema
    )
    if (!isValid) {
      this._endRequest(400, 'Bad Request', res)
      const message = `Query validation failed: ${humanReadableError}. Please ensure that the query parameters match the expected format and types defined in the schema.`
      throw new Error(message)
    }

  }
  _validateHeaders(req: IncomingMessage, res: ServerResponse, messageBindings: any) {
    const headerSchemas = messageBindings
      .map(binding => binding?.headers)
      .filter(schema => !!schema)

    if (headerSchemas.length < 1) return

    const schema = { anyOf: headerSchemas }
    const headers = req.headers

    const { isValid, humanReadableError } = validateData(
      headers,
      schema
    )

    if (!isValid) {
      this._endRequest(400, "Bad Request", res)
      const message = `Header validation failed: ${humanReadableError}. Please ensure that the headers match the expected format and types defined in the schema.`
      throw new Error(message)
    }
  }
  private _getMessageBindings(channel: ChannelInterface) {
    return channel.messages().all().map(message => message.bindings().get("http")?.json()).filter(b => !!b)
  }
  _validateRequestAgainstBindings(req: IncomingMessage, res: ServerResponse) {
    const pathName = this._extractPathname(req)
    const channel = this.parsedAsyncAPI.channels().all().filter(channel => channel.address() === pathName)[0]
    const operationsBindings = this._getOperationBindings(channel)
    const messageBindings = this._getMessageBindings(channel)
    this._validateMethod(req, res, operationsBindings)
    this._validateQueries(req, res, operationsBindings)
    this._validateHeaders(req, res, messageBindings)
  }
  async _send(message: GleeMessage): Promise<void> {
    const connection = this.httpResponses.get(message.serverName)
    connection.write(message.payload)
    connection.end()
  }

  _createMessage(pathName: string, body: any, params: any) {
    return new GleeMessage({
      payload: body,
      channel: pathName,
      query: params.query,
    })
  }
}

export default HttpAdapter
