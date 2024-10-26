import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import GleeQuoreAdapter from './lib/adapter.js'
import GleeQuoreClusterAdapter from './lib/cluster.js'
import GleeQuoreConnection from './lib/connection.js'
import GleeQuore from './index.ts'
import type GleeQuoreMessage from './lib/message.js'

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

export interface AuthFunctionInfo {
  clientAuth?: GleeQuoreAuthFunction
  serverAuth?: GleeQuoreAuthFunction
}

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

export type GleeQuoreClusterAdapterConfig = {
  adapter?: string | typeof GleeQuoreClusterAdapter
  name?: string
  url: string
}

export type WebsocketServerAdapterConfig = {
  httpServer?: any
  adapter?: WebSocketServerType | typeof GleeQuoreAdapter
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

export enum Log {
  CHANNEL_ONLY = 'channel-only',
  NONE = 'none'
}

export type LogsConfig = {
  incoming: Log
  outgoing: Log
}

export interface GleeQuoreConfig {
  includeServers?: string[],
  cluster?: GleeQuoreClusterAdapterConfig,
  http?: HttpAdapterConfig,
  kafka?: KafkaAdapterConfig,
  ws?: WebsocketAdapterConfig,
  mqtt?: MqttAdapterConfig,
}

export type GleeQuoreFunctionReturn = {
  send?: GleeQuoreFunctionReturnSend[]
  reply?: GleeQuoreFunctionReturnReply[]
  broadcast?: GleeQuoreFunctionReturnBroadcast[]
}

export type GleeQuoreFunctionEvent = {
  request: GleeQuoreMessage
  app: GleeQuore
  serverName: string
  connection?: GleeQuoreConnection
  payload?: any
  query?: QueryParam
  headers?: { [key: string]: string }
  channel?: string
}

export type GleeQuoreLifecycleEvent = Omit<GleeQuoreFunctionEvent, "request">

export type GleeQuoreAuthFunctionEvent = {
  app: GleeQuore
  authProps: AuthProps
  done: any
  serverName: string
  doc: any
}

export type GleeQuoreFunctionReturnSend = {
  payload?: any
  query?: QueryParam
  headers?: { [key: string]: string }
  channel?: string
  server?: string
}

export type GleeQuoreFunctionReturnReply = Omit<GleeQuoreFunctionReturnSend, "channel" | "server">
export type GleeQuoreFunctionReturnBroadcast = GleeQuoreFunctionReturnSend

export type GleeQuoreFunction = (
  event: GleeQuoreFunctionEvent
) => Promise<any>

export type GleeQuoreLifecycleFunction = (
  event: GleeQuoreLifecycleEvent
) => Promise<any>

export type GleeQuoreAuthFunction = (
  event: GleeQuoreAuthFunctionEvent
) => Promise<GleeQuoreAuthFunctionEvent> | void

type Headers = { [key: string]: string }
export interface Authenticatable {
  headers: Headers,
  query: QueryParam
  url: URL
}

export type AdapterRecord = {
  Adapter: typeof GleeQuoreAdapter
  instance?: GleeQuoreAdapter
  serverName: string
  server: ServerInterface
  asyncapi: AsyncAPIDocumentInterface
}

export type ClusterAdapterRecord = {
  Adapter: typeof GleeQuoreClusterAdapter
  instance?: GleeQuoreClusterAdapter
}
