import { AsyncAPIDocument } from '@asyncapi/parser'
import GleeAdapter from './adapter.js'
import GleeClusterAdapter from './cluster.js'
import GleeConnection from './connection.js'
import Glee from './glee.js'

type WebSocketServerType = 'native' | 'socket.io'

export type AuthFunction<T> = ({serverName, parsedAsyncAPI}: {serverName: string, parsedAsyncAPI: AsyncAPIDocument}) => Promise<T>

export interface MqttAuthConfig {
    cert?: string
    userPassword?: {username: string, password: string}
    clientId?: string
}

export interface WsAuthConfig {
    token?: string
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

export type MqttAdapterConfig = {
  auth?: MqttAuthConfig | AuthFunction<MqttAuthConfig>
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
  headers?: { [key: string]: string },
  channel?: string
}

export type GleeFunctionReturnSend = {
  payload?: any,
  headers?: { [key: string]: string },
  channel?: string,
  server?: string,
}

export type GleeFunctionReturnReply = GleeFunctionReturnSend
export type GleeFunctionReturnBroadcast = GleeFunctionReturnSend

export type GleeFunction = (
  event: GleeFunctionEvent
) => Promise<GleeFunctionReturn>
