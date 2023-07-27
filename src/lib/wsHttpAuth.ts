import { ErrorMiddleware, Middleware } from '../middlewares/index.js'
import { AsyncAPIDocument, SecurityScheme, Server } from '@asyncapi/parser'
import { arrayHasDuplicates, resolveFunctions } from './util.js'
import { EventEmitter } from 'events'
import { HttpAuthConfig, WsAuthConfig } from './index.js'

export type ChannelMiddlewareTuple = {
  channel: string
  fn: Middleware
}

export type ChannelErrorMiddlewareTuple = {
  channel: string
  fn: ErrorMiddleware
}

export type GenericMiddleware = Middleware | ErrorMiddleware
export type GenericChannelMiddlewareTuple =
  | ChannelMiddlewareTuple
  | ChannelErrorMiddlewareTuple

const schemesMap = {
  http: ['scheme'],
  userPass: [''],
}

class GleeAuth extends EventEmitter {
  private secReqs: { [key: string]: SecurityScheme }[]
  private parsedAsyncAPI: AsyncAPIDocument
  private serverName: string
  private AsyncAPIServer: Server
  private authConfig: WsAuthConfig | HttpAuthConfig
  private auth: { [key: string]: string } | { [key: string]: string[] }

  /**
   * Instantiates a GleeRouter.
   */
  constructor(
    AsyncAPIServer: Server,
    parsedAsyncAPI: AsyncAPIDocument,
    serverName: string,
    authConfig
  ) {
    super()
    this.secReqs
    this.parsedAsyncAPI = parsedAsyncAPI
    this.serverName = serverName
    this.AsyncAPIServer = AsyncAPIServer
    this.authConfig = authConfig
  }

  checkClientAuthConfig() {
    this.secReqs = (this.AsyncAPIServer.security() || []).map((sec) => {
      const secName = Object.keys(sec.json())[0]
      return {
        [secName]: this.parsedAsyncAPI.components().securityScheme(secName),
      }
    })

    //["tokens", "username", "password"] --> ["tokens", "userPass"]
    //["tokens", "username", "password"] --> [{tokens}, {userPass}]
    //forEach auth, try to find corresponding secReq
    const authKeys = Object.keys(this.auth)
    const secNames = this.secReqs.map((el) => Object.keys(el)[0])

    authKeys.forEach((el) => {
      const allowed = secNames.includes(el)
      if (allowed == false) {
        const err = new Error(
          `${el} securityScheme is not defined in your asyncapi.yaml config`
        )
        this.emit('error', err)
        return
      }
    })

    return authKeys

    //checkClientUnimplementedSecScheme()
    //raise a warning about any unimplemented securityScheme
  }

  async getAuthConfig(auth) {
    if (!auth) return
    if (typeof auth !== 'function') {
      await resolveFunctions(auth)
      return auth
    }

    return await auth({
      serverName: this.serverName,
      parsedAsyncAPI: this.parsedAsyncAPI,
    })
  }

  formClientAuth(authKeys, { url, headers }) {
    //attach userPass to url
    //attach bearer scheme to headers
    //return url and headers
    authKeys.map((el) => {
      const scheme = this.secReqs.find((sec) => Object.keys(sec) == el)
      if (scheme[el].scheme() == 'bearer')
        headers['authentication'] = `bearer ${this.auth[el]}`
      if (scheme[el].type() == 'userPassword') {
        url.password = this.auth[el]['password']
        url.username = this.auth[el]['username']
      }
    })

    console.log(url, headers)
    return { url, headers }
  }

  getServerAuthReq() {}

  async processClientAuth(url, headers) {
    this.auth = await this.getAuthConfig(this.authConfig)
    const authKeys = this.checkClientAuthConfig()
    return this.formClientAuth(authKeys, { url, headers })
  }

  checkClientUnimplementedSecScheme() {}

  getSchemes(type) {}
}

export default GleeAuth
