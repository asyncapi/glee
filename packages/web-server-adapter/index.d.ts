import { GleeQuoreAdapterOptions } from "@asyncapi/gleequore"

export type WsHttpAuth = WsAuthConfig | HttpAuthConfig

export interface HttpAuthConfig {
  token?: string
  username?: string
  password?: string
}

export interface WsAuthConfig {
  token?: string
  username?: string
  password?: string
}

export interface WebsocketServerAdapterConfig extends GleeQuoreAdapterOptions {
  httpServer?: any
  adapter?: WebSocketServerType | typeof GleeQuoreAdapter
  port?: number
}

export type AuthProps = {
  getToken: () => string
  getUserPass: () => {
    username: string
    password: string
  }
  getCert: () => string
  getOauthToken: () => string
  getHttpAPIKeys: (name: string) => string
  getAPIKeys: () => string
}

type Headers = { [key: string]: string }
type QueryParam = { [key: string]: string } | { [key: string]: string[] }

export interface Authenticatable {
  headers: Headers,
  query: QueryParam
  url: URL
}