/* eslint-disable security/detect-object-injection */
import { AsyncAPIDocumentInterface as AsyncAPIDocument, ServerInterface } from '@asyncapi/parser'
import EventEmitter from 'events'
import uriTemplates from 'uri-templates'
import GleeQuoreConnection from './connection.js'
import GleeQuore from '../index.js'
import GleeQuoreMessage from './message.js'
import { resolveFunctions } from './util.js'
import { AuthProps } from '../index.d.js'

export type EnrichedEvent = {
  connection?: GleeQuoreConnection
  serverName: string
  server: ServerInterface
}

export type AuthEvent = {
  serverName: string
  authProps: AuthProps
  done: any
  doc: any
}

export interface GleeQuoreAdapterOptions {
  glee: GleeQuore;
  serverName: string;
  server: ServerInterface;
  parsedAsyncAPI: AsyncAPIDocument;
}

class GleeQuoreAdapter extends EventEmitter {
  private _glee: GleeQuore
  private _serverName: string
  private _AsyncAPIServer: ServerInterface
  private _parsedAsyncAPI: AsyncAPIDocument
  private _channelNames: string[]
  private _operationIds: string[]
  private _channelAddresses: string[]
  private _connections: GleeQuoreConnection[]
  private _serverUrlExpanded: string


  constructor({ glee, serverName, server, parsedAsyncAPI }: GleeQuoreAdapterOptions) {
    super()

    this._glee = glee
    this._serverName = serverName
    this._AsyncAPIServer = server

    this._parsedAsyncAPI = parsedAsyncAPI
    this._channelNames = this._parsedAsyncAPI.channels().all().map(e => e.id())
    this._channelAddresses = this._parsedAsyncAPI.channels().all().map(c => c.address())
    this._operationIds = this._parsedAsyncAPI.operations().all().map(o => o.id())
    this._connections = []

    const uriTemplateValues = new Map()
    process.env.GLEE_SERVER_VARIABLES?.split(',').forEach((t) => {
      const [localServerName, variable, value] = t.split(':')
      if (localServerName === this._serverName) {
        uriTemplateValues.set(variable, value)
      }
    })
    this._serverUrlExpanded = uriTemplates(this._AsyncAPIServer.url()).fill(
      Object.fromEntries(uriTemplateValues.entries())
    )

    this.on('error', (err) => {
      this._glee.injectError(err)
    })
    this.on('message', (message, connection) => {
      const conn = new GleeQuoreConnection({
        connection,
        channels: this._connections.find((c) => c.rawConnection === connection)
          .channels,
        serverName,
        server,
        parsedAsyncAPI,
      })
      this._glee.injectMessage(message, serverName, conn)
    })

    function enrichEvent(ev): EnrichedEvent {
      return {
        ...ev,
        ...{
          serverName,
          server,
        },
      }
    }

    function enrichAuthEvent(ev): AuthEvent {
      return {
        ...ev,
        ...{
          serverName,
          authProps: ev.authProps,
          callback: ev.callback,
          doc: ev.doc,
        },
      }
    }

    function createConnection(ev: {
      channels?: string[]
      channel?: string
      connection: any
    }): GleeQuoreConnection {
      let channels = ev.channels
      if (!channels && ev.channel) channels = [ev.channel]

      return new GleeQuoreConnection({
        connection: ev.connection,
        channels,
        serverName,
        server,
        parsedAsyncAPI,
      })
    }

    this.on('auth', (ev) => {
      this._glee.emitInternalEvent('adapter:auth', enrichAuthEvent(ev))
    })

    this.on('connect', (ev) => {
      const conn = createConnection(ev)
      this._connections.push(conn)

      this._glee.emitInternalEvent(
        'adapter:connect',
        enrichEvent({
          connection: conn,
        })
      )
    })

    this.on('server:ready', (ev) => {
      this._glee.emitInternalEvent('adapter:server:ready', enrichEvent(ev))
    })

    this.on('server:connection:open', (ev) => {
      const conn = createConnection(ev)
      this._connections.push(conn)

      this._glee.emitInternalEvent(
        'adapter:server:connection:open',
        enrichEvent({
          connection: conn,
        })
      )
    })

    this.on('reconnect', (ev) => {
      const conn = createConnection(ev)

      this._glee.emitInternalEvent(
        'adapter:reconnect',
        enrichEvent({
          connection: conn,
        })
      )
    })

    this.on('close', (ev) => {
      const conn = createConnection(ev)

      this._glee.emitInternalEvent(
        'adapter:close',
        enrichEvent({
          connection: conn,
        })
      )
    })
  }

  get app(): GleeQuore {
    return this._glee
  }

  get serverName(): string {
    return this._serverName
  }

  get AsyncAPIServer(): ServerInterface {
    return this._AsyncAPIServer
  }

  get parsedAsyncAPI(): AsyncAPIDocument {
    return this._parsedAsyncAPI
  }

  get channelNames(): string[] {
    return this._channelNames
  }

  get operationIds(): string[] {
    return this._operationIds
  }

  get channelAddresses(): string[] {
    return this._channelAddresses
  }

  get connections(): GleeQuoreConnection[] {
    return this._connections
  }

  get serverUrlExpanded(): string {
    return this._serverUrlExpanded
  }

  async resolveProtocolConfig(protocol: string) {
    if (!this.app.options[protocol]) return undefined
    const protocolConfig = { ...this.app.options[protocol] }
    if (!protocolConfig) return undefined

    await resolveFunctions(protocolConfig)
    return protocolConfig
  }

  async getAuthConfig(auth: any) {
    if (!auth) return
    if (typeof auth !== 'function') {
      await resolveFunctions(auth)
      return auth
    }

    return await auth({
      serverName: this._serverName,
      parsedAsyncAPI: this._parsedAsyncAPI,
    })
  }

  /**
   * Returns a list of the channels a given adapter has to subscribe to.
   */
  getSubscribedChannels(): string[] {
    return this._channelNames.filter((channelName) => {
      const channel = this._parsedAsyncAPI.channels().get(channelName)
      if (channel.operations().filterByReceive().length > 0) return true

      const channelServers = channel.servers()
        ? channel.servers()
        : channel.extensions().get('x-servers')?.value() || this._parsedAsyncAPI.allServers()
      return channelServers.includes(this._serverName)
    })
  }

  /**
   * Connects to the remote server.
   */
  async connect(): Promise<any> {
    throw new Error('Method `connect` is not implemented.')
  }

  /**
   * Sends a message to the remote server.
   *
   * @param {GleeQuoreMessage} message The message to send.
   */

  async send(
    message: GleeQuoreMessage /* eslint-disable-line @typescript-eslint/no-unused-vars */
  ): Promise<any> {
    throw new Error('Method `send` is not implemented.')
  }
}

export default GleeQuoreAdapter
