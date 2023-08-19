import { AsyncAPIDocument, SecurityScheme, Server } from '@asyncapi/parser'
import { resolveFunctions } from './util.js'
import { EventEmitter } from 'events'
import { HttpAuthConfig, WsAuthConfig, AuthProps } from './index.js'

class GleeAuth extends EventEmitter {
  private secReqs: { [key: string]: SecurityScheme }[]
  private parsedAsyncAPI: AsyncAPIDocument
  private serverName: string
  private AsyncAPIServer: Server
  private authConfig: WsAuthConfig | HttpAuthConfig
  private auth: { [key: string]: string } | { [key: string]: string[] }

  /**
   * Instantiates authentication.
   */
  constructor(
    AsyncAPIServer: Server,
    parsedAsyncAPI: AsyncAPIDocument,
    serverName: string,
    authConfig?
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
    authKeys.map((el) => {
      const scheme = this.secReqs.find((sec) => Object.keys(sec) == el)
      const currentScheme = scheme[String(el)].scheme()
      const currentType = scheme[String(el)].type()
      if (currentScheme == 'bearer') {
        headers.authentication = `bearer ${this.auth[String(el)]}`
      }
      if (currentType == 'userPassword' || currentType == 'apiKey') {
        const password = this.auth[String(el)]['password']
        const username = this.auth[String(el)]['user']

        if (typeof url == 'object') {
          url.password = password
          url.username = username
          return
        }

        const myURL = new URL(url)
        myURL.password = password
        myURL.username = username
        url = myURL
      }
      if (currentType == 'oauth2') {
        headers.oauthToken = this.auth[String(el)]
      }
      if (currentType == 'httpApiKey') {
        const loc = scheme[String(el)].json('in')
        if (loc == 'header') {
          headers[scheme[String(el)].json('name')] = this.auth[String(el)]
        } else if (loc == 'query') {
          query[scheme[String(el)].json('name')] = this.auth[String(el)]
        }
      }
    })
    return { url, headers, query }
  }

  //   getServerAuthReq() {}

  getServerAuthProps(headers, query) {
    const authProps: AuthProps = {
      getToken: () => {
        return headers.authentication
      },
      getUserPass: () => {
        const buf = headers.authorization
          ? Buffer.from(headers.authorization?.split(' ')[1], 'base64')
          : undefined

        if (!buf) return

        const [username, password] = buf.toString().split(':')
        return {
          username,
          password,
        }
      },
      getCert: () => {
        return headers.cert
      },
      getOauthToken: () => {
        return headers.oauthtoken
      },
      getHttpAPIKeys: (name: string) => {
        return headers[String(name)] ?? query[String(name)]
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

  checkAuthPresense(): boolean {
    return (
      this.AsyncAPIServer.security() &&
      Object.keys(this.AsyncAPIServer.security()).length > 0
    )
  }

  //   checkClientUnimplementedSecScheme() {}

  //   getSchemes(type) {}
}

export default GleeAuth
