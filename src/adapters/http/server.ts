import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import http, { IncomingMessage, ServerResponse } from 'http'
import { StringDecoder } from 'string_decoder'
import { validateData } from '../../lib/util.js'
import GleeError from '../../errors/glee-error.js'
import * as url from 'url'
import GleeAuth from '../../lib/wsHttpAuth.js'


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
    return new Promise((resolve, reject) => {
      const decoder = new StringDecoder("utf-8")
      let result = ""

      req.on('data', (chunk) => {
        result += decoder.write(chunk);
      })

      req.on('end', () => {
        result += decoder.end();
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
        done: (val: boolean, code = 401, message = 'Unauthorized') => {
          if (val) {
            resolveFunc(true)
          } else {
            rejectFunc({ code, message })
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

  async _processRequest(req: IncomingMessage, res: ServerResponse, body: any) {
    this.httpResponses.set(this.serverName, res)
    const serverUrl = new URL(this.serverUrlExpanded)
    let { pathname } = new URL(req.url, serverUrl)
    pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname
    if (!pathname) pathname = '/'
    if (!this.parsedAsyncAPI.channels().all().filter(channel => channel.address() === pathname).length) {
      res.end('HTTP/1.1 404 Not Found1\r\n\r\n')
      const err = new Error(
        `A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file. here`
      )
      this.emit('error', err)
      return err
    }
    const { query } = url.parse(req.url, true)
    const searchParams = { query }
    let payload = body
    const channel = this.parsedAsyncAPI.channels().all().filter(channel => channel.address() === pathname)[0]
    this.emit('connect', {
      name: this.name(),
      adapter: this,
      connection: http,
      channel: channel.id(),
    })
    if (!payload) payload = null
    const msg = this._createMessage(channel.id(), payload, searchParams)
    this.emit('message', msg, http)

  }


  _handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await this._authenticateRequest(req, res)
      const body = await this._readRequestBody(req)
      await this._processRequest(req, res, body)
    } catch (e) {
      const message = ""// write an error message here
      this.emit("error", new Error(message))
    }
  }

  async _connect(): Promise<this> {
    // NOSONAR
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
  _checkHttpBinding(
    req: any,
    res: any,
    pathname: any,
    httpChannelBinding: any,
    searchParams: any,
    payload: any
  ) {
    const { query, body, method } = httpChannelBinding
    if (method && req.method !== method) {
      const err = new Error(`Cannot ${req.method} ${pathname}`)
      this.emit('error', err)
      res.end(err.message)
      return
    }
    if (query) {
      const { isValid, humanReadableError, errors } = validateData(
        searchParams.query,
        query
      )
      if (!isValid) {
        const err = new GleeError({ humanReadableError, errors })
        this.emit('error', err)
        res.end(JSON.stringify(err.errors))
        return
      }
    }
    if (body) {
      const { isValid, humanReadableError, errors } = validateData(
        payload,
        body
      )
      if (!isValid) {
        const err = new GleeError({ humanReadableError, errors })
        this.emit('error', err)
        res.end(JSON.stringify(err.errors))
        return
      }
    }
  }
  async _send(message: GleeMessage): Promise<void> {
    const connection = this.httpResponses.get(message.serverName)
    connection.write(message.payload)
    connection.end()
  }

  _createMessage(pathName: string, body: any, params: any) {
    return new GleeMessage({
      payload: JSON.parse(JSON.stringify(body)),
      channel: pathName,
      query: JSON.parse(JSON.stringify(params.query)),
    })
  }
}

export default HttpAdapter
