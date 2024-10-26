import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import GleeAdapter from './adapter.ts'
import GleeClusterAdapter from './cluster.ts'
import GleeConnection from './connection.ts'
import Glee from './glee.ts'
import type GleeMessage from './message.ts'

type WebSocketServerType = 'native' | 'socket.io'
type HttpServerType = 'native'
type QueryParam = { [key: string]: string } | { [key: string]: string[] }

export type AuthFunction<T> = ({
  serverName,
  parsedAsyncAPI,
}: {
  serverName: string
  parsedAsyncAPI: AsyncAPIDocument
}) => Promise<T>

export interface MqttAuthConfig {
  cert?: string
  username?: string
  password?: string
  clientId?: string
}

export interface WsAuthConfig {
  token?: string
  username?: string
  password?: string
}

export interface HttpAuthConfig {
  token?: string
  username?: string
  password?: string
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

export type WsHttpAuth = WsAuthConfig | HttpAuthConfig

export interface KafkaAuthConfig {
  key?: string
  cert?: string
  clientId?: string
  rejectUnauthorized?: boolean
  username?: string
  password?: string
}

export type GleeClusterAdapterConfig = {
  adapter?: string | typeof GleeClusterAdapter
  name?: string
  url: string
}

export type WebsocketServerAdapterConfig = {
  httpServer?: any
  adapter?: WebSocketServerType | typeof GleeAdapter
  port?: number
}

export type WebsocketAdapterConfig = {
  server?: WebsocketServerAdapterConfig
}

export type HttpAdapterConfig = {
  server: {
    httpServer?: any
    port?: number
  }
  client?: {
    auth?: HttpAuthConfig | AuthFunction<HttpAuthConfig>
    query?: QueryParam
    body?: any
  }
}
export type MqttAdapterConfig = {
  auth?: MqttAuthConfig | AuthFunction<MqttAuthConfig>
}

export type KafkaAdapterConfig = {
  auth?: KafkaAuthConfig | AuthFunction<KafkaAuthConfig>
}
export type Log = 'channel-only' | 'none'

export type LogsConfig = {
  incoming: Log
  outgoing: Log
}

export type CoreGleeConfig = {
  logs?: LogsConfig
  gleeDir?: string
  lifecycleDir?: string
  functionsDir?: string
  asyncapiFilePath?: string
}

export type GleeConfig = {
  glee?: CoreGleeConfig
  ws?: WebsocketAdapterConfig
  cluster?: GleeClusterAdapterConfig
  mqtt?: MqttAdapterConfig
  http?: HttpAdapterConfig
  kafka?: KafkaAdapterConfig
}

export type GleeFunctionReturn = {
  send?: GleeFunctionReturnSend[]
  reply?: GleeFunctionReturnReply[]
  broadcast?: GleeFunctionReturnBroadcast[]
}

export type GleeFunctionEvent = {
  request: GleeMessage
  glee: Glee
  serverName: string
  connection?: GleeConnection
  payload?: any
  query?: QueryParam
  headers?: { [key: string]: string }
  channel?: string
}

export type GleeLifecycleEvent = Omit<GleeFunctionEvent, "request">

export type GleeAuthFunctionEvent = {
  glee: Glee
  authProps: AuthProps
  done: any
  serverName: string
  doc: any
}

export type GleeFunctionReturnSend = {
  payload?: any
  query?: QueryParam
  headers?: { [key: string]: string }
  channel?: string
  server?: string
}

export type GleeFunctionReturnReply = Omit<GleeFunctionReturnSend, "channel" | "server">
export type GleeFunctionReturnBroadcast = GleeFunctionReturnSend

export type GleeFunction = (
  event: GleeFunctionEvent
) => Promise<GleeFunctionReturn>

export type GleeAuthFunction = (
  event: GleeAuthFunctionEvent
) => Promise<GleeAuthFunctionEvent>

type Headers = { [key: string]: string }
export interface Authenticatable {
  headers: Headers,
  query: QueryParam
  url: URL
}