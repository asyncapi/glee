import GleeAdapter from './adapter.js'
import GleeClusterAdapter from './cluster.js'
import GleeConnection from './connection.js'
import Glee from './glee.js'

type WebSocketServerType = 'native' | 'socket.io'
type HttpServerType = 'native' | 'socket.io'

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
    authentication?: {
      token?: string
    }
  }
}

export type HttpAdapterConfig = {
  server: {
    httpServer?: SyntaxError,
    adapter?: HttpServerType | typeof GleeAdapter
    port?: number
  },
  client?: {
    endpoint: any
  }
}
export type MqttAdapterConfig = {
  authentication?: {
    cert?: string
    userPassword?: { username: string; password: string },
    clientId?: string,
  }
}
export type CoreGleeConfig = {
  gleeDir?: string,
  lifecycleDir?: string,
  functionsDir?: string,
  asyncapiFilePath?: string,
}
export type GleeConfig = {
  glee?: CoreGleeConfig,
  websocket?: WebsocketAdapterConfig,
  cluster?: GleeClusterAdapterConfig,
  mqtt?: MqttAdapterConfig,
  http?: HttpAdapterConfig
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
