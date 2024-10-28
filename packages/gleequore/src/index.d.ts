import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import GleeQuoreAdapter from './lib/adapter.js'
import GleeQuoreClusterAdapter from './lib/cluster.js'
import GleeQuoreConnection from './lib/connection.js'
import GleeQuore from './index.ts'
import type GleeQuoreMessage from './lib/message.js'

export { default as GleeQuoreAdapter } from './lib/adapter.js'
export { default as GleeQuoreMessage } from './lib/message.js'
export { default as GleeQuoreConnection } from './lib/connection.js'
export { default as GleeQuoreClusterAdapter } from './lib/cluster.js'
export { default as GleeQuoreError } from './errors.js'

export interface AuthFunctionInfo {
  clientAuth?: GleeQuoreAuthFunction
  serverAuth?: GleeQuoreAuthFunction
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

export type GleeQuoreClusterAdapterConfig = {
  adapter?: string | typeof GleeQuoreClusterAdapter
  name?: string
  url: string
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

export type GleeQuoreFunction = (
  event: GleeQuoreFunctionEvent
) => Promise<any>

export type GleeQuoreLifecycleFunction = (
  event: GleeQuoreLifecycleEvent
) => Promise<any>

export type GleeQuoreAuthFunction = (
  event: GleeQuoreAuthFunctionEvent
) => Promise<GleeQuoreAuthFunctionEvent> | void

export interface GleeQuoreAdapterOptions {
  glee: GleeQuore;
  serverName: string;
  server: ServerInterface;
  parsedAsyncAPI: AsyncAPIDocument;
  config?: object
}

export type AdapterRecord = {
  Adapter: typeof GleeQuoreAdapter
  instance?: GleeQuoreAdapter
  serverName: string
  server: ServerInterface
  asyncapi: AsyncAPIDocumentInterface
  config?: object
}

export type ClusterAdapterRecord = {
  Adapter: typeof GleeQuoreClusterAdapter
  instance?: GleeQuoreClusterAdapter,
  clusterName?: string,
  clusterURL?: string
}
