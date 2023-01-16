import GleeAdapter from './adapter.js'
import GleeClusterAdapter from './cluster.js'
import GleeConnection from './connection.js'
import Glee from './glee.js'

type WebSocketServerType = 'native' | 'socket.io'

export type GleeClusterAdapterConfig = {
  adapter?: string | typeof GleeClusterAdapter,
  name?: string,
  url: string,
}

export type WebsocketAdapterConfig = {
    httpServer?: any,
    adapter?: WebSocketServerType | typeof GleeAdapter,
    port?: number,
    query?: any
    authentication?: {
      token?: string
    }
}

export type MqttAdapterConfig = {
  authentication?: {
    cert?: string
    userPassword?: { username: string; password: string },
    clientId?: string,
  }
}

export type GleeConfig = {
  websocket?: {
    [serverName: string]: WebsocketAdapterConfig
  },
  cluster?: GleeClusterAdapterConfig,
  mqtt?: {
    [serverName: string]: MqttAdapterConfig
  },
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
