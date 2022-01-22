import GleeAdapter from './adapter'
import GleeClusterAdapter from './cluster'
import GleeConnection from './connection'
import Glee from './glee'

type WebSocketServerType = 'native' | 'socket.io'

export type GleeClusterAdapterConfig = {
  adapter?: string | typeof GleeClusterAdapter,
  name?: string,
  url: string
}

export type GleeConfig = {
  websocket?: {
    httpServer?: any,
    adapter?: WebSocketServerType | typeof GleeAdapter,
    port?: number,
  },
  cluster?: GleeClusterAdapterConfig
}

export type GleeFunctionReturn = {
  send?: GleeFunctionReturnSend[],
  reply?: GleeFunctionReturnReply[],
  broadcast?: GleeFunctionReturnBroadcast[],
}
 
export type GleeFunctionEvent = {
  glee: Glee,
  serverName: string,
  connection?: GleeConnection,
  payload?: any,
  headers?: { [key: string]: string },
  channel?: string,
}

export type GleeFunctionReturnSend = {
  payload?: any,
  headers?: { [key: string]: string },
  channel?: string,
  server?: string,
}

export type GleeFunctionReturnReply = GleeFunctionReturnSend
export type GleeFunctionReturnBroadcast = GleeFunctionReturnSend

export type GleeFunction = (event: GleeFunctionEvent) => Promise<GleeFunctionReturn>
