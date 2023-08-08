import { AsyncAPIDocument, SecurityScheme, Server } from '@asyncapi/parser'
import { arrayHasDuplicates, resolveFunctions } from './util.js'
import { EventEmitter } from 'events'
import { HttpAuthConfig, WsAuthConfig } from './index.js'
// import * as url from 'url'
import { AuthProps } from './index.js'

const schemesMap = {
  http: ['scheme'],
  userPass: [''],
}

const inMap = {
  header: 'headers',
  query: 'query',
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
    this.secReqs = []
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
      if (!allowed) {
        const err = new Error(
          `${el} securityScheme is not defined in your asyncapi.yaml config`
        )
        this.emit('error', err)
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

  formClientAuth(authKeys, { url, headers, query }) {
    if (!authKeys) return { url, headers }
    //attach userPass to url, attach bearer scheme to headers then return url and headers
    authKeys.map((el) => {
      const scheme = this.secReqs.find((sec) => Object.keys(sec) == el)
      if (scheme[el].scheme() == 'bearer') {
        headers.authentication = `bearer ${this.auth[el]}`
      }
      if (
        scheme[el].type() == 'userPassword' ||
        scheme[el].type() == 'apiKey'
      ) {
        //TODO: parse url using url.parse(), or the way it's done in websockets for the sake of HTTP userPassword auth scheme
        // console.log('url is an object', typeof url == 'object')
        // console.log('Object url', new URL(url))
        // console.log('URL parser', myURL)
        //parse url add auth then unparse
        // url.auth = `'${this.auth[el]['username']}:${this.auth[el]['password']}'`

        // console.log(myURL.href)
        if (typeof url == 'object') {
          url.password = this.auth[el]['password']
          url.username = this.auth[el]['user']
          return
        }

        const myURL = new URL(url)
        myURL.password = this.auth[el]['password']
        myURL.username = this.auth[el]['user']

        url = myURL
      }
      if (scheme[el].type() == 'oauth2') {
        headers.oauthToken = this.auth[el]
      }
      if (scheme[el].type() == 'httpApiKey') {
        const loc = scheme[el].json('in')
        if (loc == 'header') {
          headers[scheme[el].json('name')] = this.auth[el]
        } else if (loc == 'query') {
          query[scheme[el].json('name')] = this.auth[el]
        }
      }
    })
    // console.log(headers, query, myUrl)
    return { url, headers, query }
  }

  //   getServerAuthReq() {}

  getServerAuthProps(headers, query) {
    const authProps: AuthProps = {
      getToken: () => {
        return headers['authentication']
      },
      getUserPass: () => {
        const buf = headers['authorization']
          ? Buffer.from(headers['authorization']?.split(' ')[1], 'base64')
          : undefined

        if (!buf) return

        const [username, password] = buf.toString().split(':')
        return {
          username,
          password,
        }
      },
      getCert: () => {
        return headers['cert']
      },
      getOauthToken: () => {
        return headers['oauthtoken']
      },
      getHttpAPIKeys: (name: string) => {
        return headers[name] ?? query[name]
      },
      getAPIKeys: () => {
        return `keys`
      },
    }

    return authProps
  }

  async processClientAuth(url, headers, query) {
    this.auth = await this.getAuthConfig(this.authConfig)
    const authKeys = this.checkClientAuthConfig()
    if (!authKeys) return
    return this.formClientAuth(authKeys, { url, headers, query })
  }

  //   checkClientUnimplementedSecScheme() {}

  //   getSchemes(type) {}
}

export default GleeAuth
