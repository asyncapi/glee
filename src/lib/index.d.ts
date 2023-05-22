import { AsyncAPIDocument } from '@asyncapi/parser'
import GleeAdapter from './adapter.js'
import GleeClusterAdapter from './cluster.js'
import GleeConnection from './connection.js'
import Glee from './glee.js'

type WebSocketServerType = 'native' | 'socket.io'
type HttpServerType = 'native'
type QueryParam = { [key: string]: string } | { [key: string]: string[] }

export type AuthFunction<T> = ({serverName, parsedAsyncAPI}: {serverName: string, parsedAsyncAPI: AsyncAPIDocument}) => Promise<T>

export interface MqttAuthConfig {
    cert?: string
    username?: string
    password?: string
    clientId?: string
}

export interface AMQPAuthConfig {
  cert?: string
  key?: string
  username?: string
  password?: string
}

export interface WsAuthConfig {
    token?: string
}

export interface HttpAuthConfig {
  token?: string
}

export interface KafkaAuthConfig {
  key?: string
  cert?: string
  clientId?: string
  rejectUnauthorized?: boolean
  username?: string
  password?: string
}

export type GleeClusterAdapterConfig = {
  adapter?: string | typeof GleeClusterAdapter,
  name?: string,
  url: string,
}

export type WebsocketAdapterConfig = {
  server?: {
    httpServer?: any,
    adapter?: WebSocketServerType | typeof GleeAdapter,
    port?: number,
  },
  client?: {
    query?: any
    auth?: WsAuthConfig | AuthFunction<WsAuthConfig>
  }
}

export type HttpAdapterConfig = {
  server: {
    httpServer?: any,
    port?: number
  },
  client?: {
    auth?:  HttpAuthConfig | AuthFunction<HttpAuthConfig>,
    query?: QueryParam,
    body?: any
  }
}
export type MqttAdapterConfig = {
  auth?: MqttAuthConfig | AuthFunction<MqttAuthConfig>
}

export type AMQPAdapterConfig = {
  auth?: AMQPAuthConfig | AuthFunction<AMQPAuthConfig>
}

export type KafkaAdapterConfig = {
  auth?: KafkaAuthConfig | AuthFunction<KafkaAuthConfig>
}

export type CoreGleeConfig = {
  gleeDir?: string,
  lifecycleDir?: string,
  functionsDir?: string,
  asyncapiFilePath?: string,
}

export type GleeConfig = {
  glee?: CoreGleeConfig
  ws?: WebsocketAdapterConfig,
  cluster?: GleeClusterAdapterConfig,
  mqtt?: MqttAdapterConfig,
  http?: HttpAdapterConfig
  kafka?: KafkaAdapterConfig
  amqp?: AMQPAdapterConfig
}

export type GleeFunctionReturn = {
  send?: GleeFunctionReturnSend[],
  reply?: GleeFunctionReturnReply[],
  broadcast?: GleeFunctionReturnBroadcast[]
}

export type GleeFunctionEvent = {
  glee: Glee,
  serverName: string,
  connection?: GleeConnection,
  payload?: any,
  query?: QueryParam,
  headers?: { [key: string]: string },
  channel?: string
}

export type GleeFunctionReturnSend = {
  payload?: any,
  query?: QueryParam,
  headers?: { [key: string]: string },
  channel?: string,
  server?: string,
}

export type GleeFunctionReturnReply = GleeFunctionReturnSend
export type GleeFunctionReturnBroadcast = GleeFunctionReturnSend

export type GleeFunction = (
  event: GleeFunctionEvent
) => Promise<GleeFunctionReturn>
