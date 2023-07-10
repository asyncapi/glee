import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import http from 'http'
import { validateData } from '../../lib/util.js'
import GleeError from '../../errors/glee-error.js'
import * as url from 'url'

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

  async _connect(): Promise<this> {
    // NOSONAR
    const config = await this.resolveProtocolConfig('http')
    const httpOptions = config?.server
    const serverUrl = new URL(this.serverUrlExpanded)
    const httpServer = httpOptions?.httpServer || http.createServer()
    const asyncapiServerPort = serverUrl.port || 80
    const optionsPort = httpOptions?.port
    const port = optionsPort || asyncapiServerPort

    httpServer.on('request', async (req, res) => {
      res.setHeader('Content-Type', 'application/json')

      const bodyBuffer = []
      let body: object
      req.on('data', (chunk) => {
        bodyBuffer.push(chunk)
      })

      function done() {
        let resolveFunc, rejectFunc
        const promise = new Promise((resolve, reject) => {
          resolveFunc = resolve
          rejectFunc = reject
        })
        return {
          promise,
          done: (val) => {
            if (val === true) {
              resolveFunc(true)
            } else if (val === false) {
              rejectFunc(new Error('auth failed!'))
            }
          },
        }
      }

      function checkAuthPresense() {
        return (
          this.AsyncAPIServer.security() &&
          Object.keys(this.AsyncAPIServer.security()).length > 0
        )
      }

      const { promise, done: callback } = done()

      if (checkAuthPresense.call(this)) {
        console.log('http-server.ts emitting auth')
        this.emit('auth', {
          headers: req.headers,
          server: this.serverName,
          callback,
          doc: this.AsyncAPIServer,
        })
      }

      req.on('end', async () => {
        if (checkAuthPresense.call(this)) await promise
        body = JSON.parse(Buffer.concat(bodyBuffer).toString())
        this.httpResponses.set(this.serverName, res)
        let { pathname } = new URL(req.url, serverUrl)
        pathname = pathname.startsWith('/') ? pathname.substring(1) : pathname
        if (!this.parsedAsyncAPI.channel(pathname)) {
          res.end('HTTP/1.1 404 Not Found1\r\n\r\n')
          const err = new Error(
            `A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file. here`
          )
          this.emit('error', err)
          return err
        }
        const { query } = url.parse(req.url, true)
        const searchParams = { query }
        const payload = body
        const httpChannelBinding = this.parsedAsyncAPI
          .channel(pathname)
          .binding('http')
        if (httpChannelBinding) {
          this._checkHttpBinding(
            req,
            res,
            pathname,
            httpChannelBinding,
            searchParams,
            payload
          )
        }
        this.emit('connect', {
          name: this.name(),
          adapter: this,
          connection: http,
          channel: pathname,
        })
        const msg = this._createMessage(pathname, payload, searchParams)
        this.emit('message', msg, http)
      })
    })

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
