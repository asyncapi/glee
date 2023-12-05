import { AsyncAPIDocumentInterface as AsyncAPIDocument, SecuritySchemeInterface as SecurityScheme, ServerInterface } from '@asyncapi/parser'
import { resolveFunctions } from './util.js'
import { EventEmitter } from 'events'
import { HttpAuthConfig, WsAuthConfig, AuthProps, Authenticatable } from './index.js'

class GleeAuth extends EventEmitter {
  private secReqs: { [key: string]: SecurityScheme }[]
  private parsedAsyncAPI: AsyncAPIDocument
  private serverName: string
  private AsyncAPIServer: ServerInterface
  private authConfig: WsAuthConfig | HttpAuthConfig
  private auth: { [key: string]: string } | { [key: string]: string[] }

  /**
   * Instantiates authentication.
   */
  constructor(
    AsyncAPIServer: ServerInterface,
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
    const securitySchemeID = this.parsedAsyncAPI.securitySchemes().all().map(s => s.id())

    const authKeys = Object.keys(this.auth)
    authKeys.forEach(authKey => {
      const allowed = securitySchemeID.includes(authKey)
      if(!allowed) {
        const err = new Error(`${authKey} securityScheme is not defined is your asyncapi.yaml config`)
        this.emit('error', err)
      }
    })

    return authKeys
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
    authKeys.map((authKey) => {
      const scheme = this.parsedAsyncAPI.securitySchemes().get(authKey)
      const currentScheme = scheme.scheme()
      const currentType = scheme.type()
      if (currentScheme == 'bearer') {
        headers.authentication = `bearer ${this.auth[String(authKey)]}`
        return
      }
      if (currentType == 'userPassword' || currentType == 'apiKey') {
        url = this.userPassApiKeyLogic(url, authKey)
        return
      }
      if (currentType == 'oauth2') {
        headers.oauthToken = this.auth[String(authKey)]
      }
      if (currentType == 'httpApiKey') {
        const conf = this.httpApiKeyLogic(scheme, headers, query, authKey)
        headers = conf.headers
        query = conf.query
        
      }
    })
    return { url, headers, query }
  }

  private userPassApiKeyLogic(url, authKey) {
    const password = this.auth[String(authKey)]['password']
    const username = this.auth[String(authKey)]['user']

    if (typeof url == 'object') {
      url.password = password
      url.username = username
      return url
    }

    const myURL = new URL(url)
    myURL.password = password
    myURL.username = username
    return myURL
  }

  private httpApiKeyLogic(scheme, headers, query, authKey) {
    
    const loc = scheme.in()
    if (loc == 'header') {
      headers[scheme.name()] = this.auth[String(authKey)]
    } else if (loc == 'query') {
      query[scheme.name()] = this.auth[String(authKey)]
    }

    return { headers, query }
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

  async processClientAuth({ url, headers, query }: Authenticatable) {
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
}

export default GleeAuth