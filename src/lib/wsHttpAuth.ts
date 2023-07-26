import { ErrorMiddleware, Middleware } from '../middlewares/index.js'
import { AsyncAPIDocument, SecurityScheme, Server } from '@asyncapi/parser'
import { arrayHasDuplicates } from './util.js'

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

class GleeAuth {
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
    this.secReqs
    this.parsedAsyncAPI = parsedAsyncAPI
    this.adapter = adapter
    this.AsyncAPIServer = AsyncAPIServer
    this.auth = authParams
  }

  checkClientAuthConfig() {
    console.log(this.adapter)
    console.log(this.auth)
    this.secReqs = (this.AsyncAPIServer.security() || []).map((sec) => {
      const secName = Object.keys(sec.json())[0]
      return {
        [secName]: this.parsedAsyncAPI.components().securityScheme(secName),
      }
    })

    console.log(this.secReqs)

    //["tokens", "username", "password"] --> ["tokens", "userPass"]

    //["tokens", "username", "password"] --> [{tokens}, {userPass}]

    //forEach auth, try to find corresponding secReq

    const authKeys = Object.keys(this.auth)

    const secNames = this.secReqs.map((el) => Object.keys(el)[0])

    console.log(authKeys)
    console.log(secNames)

    authKeys.map((el) => {
      const allowed = secNames.includes(el)
      if (allowed == false) console.log(`${el} is not allowed`)
    })

    // console.log(
    //   authKeys.map((el) => {
    //     console.log(el)
    //     return this.secReqs.find((sec) => Object.keys(sec)[0] == el)
    //   })
    // )

    // console.log(this.secReqs)
  }

  getAuthConfig() {}

  formClientAuth() {}

  getServerAuthReq() {}
}

export default GleeAuth
