import { ErrorMiddleware, Middleware } from '../middlewares/index.js'
import { AsyncAPIDocument, SecurityScheme, Server } from '@asyncapi/parser'
import { arrayHasDuplicates } from './util.js'
import { EventEmitter } from 'events'

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
  private adapter: string
  private AsyncAPIServer: Server
  private auth: { [key: string]: string } | { [key: string]: string[] }

  /**
   * Instantiates a GleeRouter.
   */
  constructor(
    AsyncAPIServer: Server,
    parsedAsyncAPI: AsyncAPIDocument,
    adapter: string,
    authParams
  ) {
    super()
    this.secReqs
    this.parsedAsyncAPI = parsedAsyncAPI
    this.adapter = adapter
    this.AsyncAPIServer = AsyncAPIServer
    this.auth = authParams
  }

  checkClientAuthConfig() {
    // console.log(this.adapter)
    // console.log(this.auth)
    // const secSchemes = []
    this.secReqs = (this.AsyncAPIServer.security() || []).map((sec) => {
      const secName = Object.keys(sec.json())[0]
      //   secSchemes.push({
      //     [secName]: this.parsedAsyncAPI.components().securityScheme(secName),
      //   })
      return {
        [secName]: this.parsedAsyncAPI.components().securityScheme(secName),
      }
      //   return this.parsedAsyncAPI.components().securityScheme(secName)
    })

    // console.log(this.secReqs)

    //["tokens", "username", "password"] --> ["tokens", "userPass"]

    //["tokens", "username", "password"] --> [{tokens}, {userPass}]

    //forEach auth, try to find corresponding secReq

    const authKeys = Object.keys(this.auth)

    const secNames = this.secReqs.map((el) => Object.keys(el)[0])

    // console.log(authKeys)
    // console.log(secNames)

    authKeys.forEach((el) => {
      const allowed = secNames.includes(el)
      if (allowed == false) {
        // console.log(`${el} is not allowed`)
        // return false
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

  getAuthConfig() {}

  formClientAuth(authKeys, { url, headers }) {
    //attach userPass to url
    //attach bearer scheme to headers
    //return url and headers
    authKeys.map((el) => {
      const scheme = this.secReqs.find((sec) => Object.keys(sec) == el)
      console.log(scheme[el].scheme())
      if (scheme[el].scheme() == 'bearer')
        headers['authorization'] = `bearer ${this.auth[el]}`
      if (scheme[el].type() == 'userPass') {
        url.password = this.auth[el]['password']
        url.username = this.auth[el]['username']
      }
    })

    console.log(url, headers)
  }

  getServerAuthReq() {}

  processClientAuth(url, headers) {
    const authKeys = this.checkClientAuthConfig()
    this.formClientAuth(authKeys, { url, headers })
  }

  checkClientUnimplementedSecScheme() {}

  getSchemes(type) {}
}

export default GleeAuth
