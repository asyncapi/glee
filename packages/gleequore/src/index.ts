/* eslint-disable @typescript-eslint/no-unused-vars */
import EventEmitter from 'events'
import async from 'async'
import Debug from 'debug'
import GleeQuoreAdapter, { GleeQuoreAdapterOptions } from './lib/adapter.js'
import GleeQuoreClusterAdapter from './lib/cluster.js'
import GleeQuoreRouter, {
  ChannelErrorMiddlewareTuple,
  ChannelMiddlewareTuple,
  GenericMiddleware,
} from './lib/router.js'
import GleeQuoreMessage, { IGleeQuoreMessageConstructor } from './lib/message.js'
import { matchChannel, duplicateMessage, getParams } from './lib/util.js'
import GleeQuoreConnection from './lib/connection.js'
import { MiddlewareCallback } from './middlewares/index.js'
import buffer2string from './middlewares/buffer2string.js'
import string2json from './middlewares/string2json.js'
import json2string from './middlewares/json2string.js'
import validate from './middlewares/validate.js'
import existsInAsyncAPI from './middlewares/existsInAsyncAPI.js'
import validateConnection from './middlewares/validateConnection.js'
import WebSocketServerAdapter from './adapters/ws/server.js'
import WebsocketClientAdapter from './adapters/ws/client.js'
import { EnrichedEvent, AuthEvent } from './lib/adapter.js'
import { getMessagesSchema } from './lib/util.js'

import { AsyncAPIDocumentInterface, ServerInterface } from '@asyncapi/parser'
import { AdapterRecord, AuthFunctionInfo, ClusterAdapterRecord, GleeQuoreFunction, GleeQuoreLifecycleFunction, GleeQuoreConfig, GleeQuoreLifecycleEvent, GleeQuoreFunctionEvent, GleeQuoreAuthFunction, GleeQuoreAuthFunctionEvent } from './index.d.js'
import MqttAdapter from './adapters/mqtt/index.js'
import KafkaAdapter from './adapters/kafka/index.js'
import HttpClientAdapter from './adapters/http/client.js'
import HttpServerAdapter from './adapters/http/server.js'
import RedisClusterAdapter from './adapters/cluster/redis/index.js'
import SocketIOAdapter from './adapters/socket.io/index.js'

const debug = Debug('gleequore')

export enum LifecycleEvent {
  onConnect = 'onConnect',
  onReconnect = 'onReconnect',
  onDisconnect = 'onDisconnect',
  onServerReady = 'onServerReady',
  onServerConnectionOpen = 'onServerConnectionOpen',
  onServerConnectionClose = 'onServerConnectionClose',
}

export interface LifecycleEventRecord {
  func: GleeQuoreLifecycleFunction
  servers: string[]
}

export interface FunctionInfoRecord {
  run: GleeQuoreFunction
}

export default class GleeQuore {
  private _asyncapi: AsyncAPIDocumentInterface
  private _options: GleeQuoreConfig
  private _router: GleeQuoreRouter
  private _adapters: AdapterRecord[]
  private _clusterAdapter: ClusterAdapterRecord
  private _internalEvents: EventEmitter
  private _lifecycleEvents: Map<string, LifecycleEventRecord[]>
  private _functions: Map<string, FunctionInfoRecord>
  private _authFunctions: Map<string, AuthFunctionInfo>


  /**
   * Instantiates the quore of Glee.
   *
   * @param {Object} [options={}]
   */
  constructor(asyncapi: AsyncAPIDocumentInterface, options: GleeQuoreConfig = {}) {
    this._asyncapi = asyncapi
    this._options = options
    this._router = new GleeQuoreRouter()
    this._adapters = []
    this._internalEvents = new EventEmitter({ captureRejections: true })
    this._lifecycleEvents = new Map<string, LifecycleEventRecord[]>()
    this._functions = new Map()
    this._authFunctions = new Map<string, AuthFunctionInfo>()

    this.use(existsInAsyncAPI(asyncapi))
    this.useOutbound(existsInAsyncAPI(asyncapi))

    this.useOutbound(validateConnection)
    this.use((err, message, next) => {
      this._internalEvents.emit('error', err)
      next(err, message)
    })
    this.useOutbound((err, message, next) => {
      this._internalEvents.emit('error', err)
      next(err, message)
    })
    this.use(buffer2string)
    this.use(string2json)

    asyncapi.operations().filterByReceive().forEach(operation => {
      const channel = operation.channels().all()[0] // operation can have only one channel.
      if (operation.reply()) {
        console.warn(`Operation ${operation.id()} has a reply defined. Glee does not support replies yet.`)
      }
      const schema = getMessagesSchema(operation)
      const contextErrorMessage = `Your application is receiving a message on channel "${channel.id()}" but the payload of the message is not matching the definition(s) in your AsyncAPI document. If you believe your code is correct, have a look at your AsyncAPI document, especially the messages listed in the channels › ${channel.id()} section. Otherwise, check your code. Here's what failed:\n\n`
      if (schema.oneOf.length > 1) {
        this.use(channel.id(), validate(schema, contextErrorMessage))
      } else if (schema.oneOf.length === 1) {
        this.use(channel.id(), validate(schema.oneOf[0], contextErrorMessage))
      }
      this.use(channel.id(), (event, next) => {
        this.runFunction(operation.id(), event).then(next).catch((err) => {
          next(err, event, next)
        })
      })
    })

    asyncapi.operations().filterBySend().forEach(operation => {
      const channel = operation.channels().all()[0] // operation can have only one channel.
      if (operation.reply()) {
        console.warn(`Operation ${operation.id()} has a reply defined. Glee does not support replies yet.`)
      }
      const schema = getMessagesSchema(operation)
      const contextErrorMessage = `Your application is sending a message to channel "${channel.id()}" but the payload of the message is not matching the definition(s) in your AsyncAPI document. If you believe your code is correct, have a look at your AsyncAPI document, especially the messages listed in the channels › ${channel.id()} section. Otherwise, check your code. Here's what failed:\n\n`
      if (schema.oneOf.length > 1) {
        this.useOutbound(channel.id(), validate(schema, contextErrorMessage))
      } else if (schema.oneOf.length === 1) {
        this.useOutbound(channel.id(), validate(schema.oneOf[0], contextErrorMessage))
      }
      this.useOutbound(channel.id(), json2string)
    })

    this._internalEvents.on('adapter:auth', async (e: AuthEvent) => {
      await this.runAuth({
        app: this,
        serverName: e.serverName,
        authProps: e.authProps,
        done: e.done,
        doc: e.doc,
      })
    })

    this._internalEvents.on('adapter:connect', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onConnect, {
        app: this,
        serverName: e.serverName,
        connection: e.connection,
      })
    })

    this._internalEvents.on('adapter:reconnect', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onReconnect, {
        app: this,
        serverName: e.serverName,
        connection: e.connection,
      })
    })

    this._internalEvents.on('adapter:close', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onDisconnect, {
        app: this,
        serverName: e.serverName,
        connection: e.connection,
      })
    })

    this._internalEvents.on('adapter:server:ready', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onServerReady, {
        app: this,
        serverName: e.serverName,
      })
    })

    this._internalEvents.on('adapter:server:connection:open', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onServerConnectionOpen, {
        app: this,
        serverName: e.serverName,
        connection: e.connection,
      })
    })

    this._internalEvents.on('adapter:server:connection:close', async (e: EnrichedEvent) => {
      await this.runLifecycleEvent(LifecycleEvent.onServerConnectionClose, {
        app: this,
        serverName: e.serverName,
        connection: e.connection,
      })
    })
  }

  get asyncapi(): AsyncAPIDocumentInterface {
    return this._asyncapi
  }

  get options(): GleeQuoreConfig {
    return this._options
  }

  get adapters(): AdapterRecord[] {
    return this._adapters
  }

  get clusterAdapter(): ClusterAdapterRecord {
    return this._clusterAdapter
  }

  /**
   * Adds a connection adapter.
   *
   * @param {GleeQuoreAdapter} adapter The adapter.
   * @param {String} serverName The name of the AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIServer} server AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIDocument} asyncapi The AsyncAPI document.
   */
  addAdapter(
    Adapter: typeof GleeQuoreAdapter,
    {
      serverName,
      server,
      asyncapi,
    }: { serverName: string; server: ServerInterface | undefined; asyncapi: AsyncAPIDocumentInterface }
  ) {
    this._adapters.push({ Adapter, serverName, server, asyncapi })
  }

  /**
   * Sets the cluster adapter to use.
   *
   * @param {GleeQuoreClusterAdapter} adapter The adapter.
   */
  setClusterAdapter(Adapter: typeof GleeQuoreClusterAdapter) {
    this._clusterAdapter = {
      Adapter,
    }
  }

  /**
   * Use a middleware for inbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeQuoreRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  use(...middlewares: GenericMiddleware[]): void
  use(channel: string, ...middlewares: GenericMiddleware[]): void
  use(
    channel: string | GenericMiddleware,
    ...middlewares: GenericMiddleware[]
  ): void {
    this._router.use(...arguments) // eslint-disable-line prefer-rest-params
  }

  /**
   * Use a middleware for outbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeQuoreRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  useOutbound(...middlewares: GenericMiddleware[]): void
  useOutbound(channel: string, ...middlewares: GenericMiddleware[]): void
  useOutbound(
    channel: string | GenericMiddleware,
    ...middlewares: GenericMiddleware[]
  ): void {
    this._router.useOutbound(...arguments) // eslint-disable-line prefer-rest-params
  }

  /**
   * Send a message to the connected servers.
   *
   * @param {IGleeQuoreMessageConstructor|GleeQuoreMessage} message The message you want to send.
   */
  send(message: IGleeQuoreMessageConstructor | GleeQuoreMessage): void {
    console.log(message)
    let msg: GleeQuoreMessage
    if (message instanceof GleeQuoreMessage) {
      msg = message
    } else {
      msg = new GleeQuoreMessage(message)
    }

    msg.setOutbound()

    this._processMessage(
      this._router.getOutboundMiddlewares(),
      this._router.getOutboundErrorMiddlewares(),
      msg
    )
  }

  /**
   * Starts the application.
   */
  async start(): Promise<any[]> {
    const promises = []

    await this.registerAdapters()

    this._adapters.forEach((a) => {
      const adapterOptions: GleeQuoreAdapterOptions = {
        glee: this,
        serverName: a.serverName,
        server: a.server,
        parsedAsyncAPI: a.asyncapi
      }

      a.instance = new a.Adapter(adapterOptions)
      promises.push(a.instance.connect())
    })

    try {
      if (this._clusterAdapter) {
        this._clusterAdapter.instance = new this._clusterAdapter.Adapter(this)
        promises.push(this._clusterAdapter.instance.connect().catch((error) => {
          console.error('Error connecting to cluster:', error)
        }))
      }
    } catch (error) {
      console.error('Error connecting:', error)
    }

    return Promise.all(promises)
  }

  /**
   * Injects a message into the Glee inbound middleware chain.
   *
   * @param {GleeQuoreMessage} message The message you want to send.
   * @param {String} serverName The name of the server this message is coming from.
   * @param {GleeQuoreConnection} [connection] The connection used when receiving the message. Its type is unknown and must be handled by the adapters.
   */
  injectMessage(
    message: GleeQuoreMessage,
    serverName: string,
    connection: GleeQuoreConnection
  ) {
    message.serverName = serverName
    message.connection = connection
    message.setInbound()

    this._processMessage(
      this._router.getMiddlewares(),
      this._router.getErrorMiddlewares(),
      message
    )
  }

  /**
   * Injects an error into the Glee inbound error middleware chain.
   *
   * @param {Any} error The error.
   * @param {String} [channel] The channel of the error.
   */
  injectError(error: Error, channel?: string) {
    this._processError(
      this._router.getErrorMiddlewares(),
      error,
      new GleeQuoreMessage({ channel })
    )
  }

  /**
   * Synchronizes the other instances in the cluster with the message.
   *
   * @param {GleeQuoreMessage} message
   */
  syncCluster(message: GleeQuoreMessage): void {
    if (this._clusterAdapter && !message.cluster) {
      this._clusterAdapter.instance.send(message).catch((e: Error) => {
        this._processError(this._router.getErrorMiddlewares(), e, message)
      })
    }
  }

  /**
   * Starts executing the middlewares for the given message.
   *
   * @param {ChannelMiddlewareTuple} middlewares The middleware chain to execute.
   * @param {ChannelErrorMiddlewareTuple} errorMiddlewares The middlewares chain to execute in case of error.
   * @param {GleeQuoreMessage} message The message to pass to the middlewares.
   * @private
   */
  private _processMessage(
    middlewares: ChannelMiddlewareTuple[],
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    message: GleeQuoreMessage
  ): void {
    const mws = middlewares
      .filter((mw) => matchChannel(mw.channel, message.channel))
      .map((mw) => (msg: GleeQuoreMessage, next: MiddlewareCallback) => {
        const msgForMiddleware: GleeQuoreMessage = duplicateMessage(msg)
        msgForMiddleware.params = getParams(
          mw.channel,
          msgForMiddleware.channel
        )

        msgForMiddleware.on('send', (m: GleeQuoreMessage) => {
          m.setOutbound()
          this._processMessage(
            this._router.getOutboundMiddlewares(),
            this._router.getOutboundErrorMiddlewares(),
            m
          )
        })

        mw.fn.call(
          mw.fn,
          msgForMiddleware,
          (err: Error, newMessage: GleeQuoreMessage) => {
            const nextMessage = newMessage || msgForMiddleware
            nextMessage.channel = message.channel // This is to avoid the channel to be modified.
            next(err, nextMessage)
          }
        )
      })

    async.seq(...mws)(message, (err: Error, msg: GleeQuoreMessage) => {
      if (err) {
        message.notifyFailedProcessing()
        debug('Error encountered while processing middlewares.')
        this._processError(errorMiddlewares, err, msg)
        return
      }

      if (middlewares === this._router.getOutboundMiddlewares()) {
        debug('Outbound pipeline finished. Sending message...')
        this._adapters.forEach((a: AdapterRecord) => {
          if (
            a.instance &&
            (!msg.serverName || msg.serverName === a.serverName)
          ) {
            a.instance.send(msg).catch((e: Error) => {
              this._processError(errorMiddlewares, e, msg)
            })
          }
        })
      } else {
        message.notifySuccessfulProcessing()
        debug('Inbound pipeline finished.')
      }
    })
  }

  /**
   * Starts executing the middlewares for the given error and message.
   *
   * @param {Array} errorMiddlewares The error middlewares chain to execute.
   * @param {Any} error The error to pass to the middleware.
   * @param {GleeQuoreMessage} message The message to pass to the middlewares.
   * @private
   */
  private _processError(
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    error: Error,
    message: GleeQuoreMessage
  ): void {
    const emws = errorMiddlewares.filter((emw) =>
      matchChannel(emw.channel, message.channel)
    )
    if (!emws.length) return

    this._execErrorMiddleware(emws, 0, error, message)
  }

  private _execErrorMiddleware(
    emws: ChannelErrorMiddlewareTuple[],
    index: number,
    error: Error,
    message: GleeQuoreMessage
  ) {
    const emwsLength = emws.length
    emws[(index + emwsLength) % emwsLength].fn(error, message, (err: Error) => {
      if (!emws[index + 1]) return
      this._execErrorMiddleware.call(null, emws, index + 1, err, message)
    })
  }

  emitInternalEvent(eventName: string | symbol, ...args: any[]): boolean {
    return this._internalEvents.emit(eventName, ...args)
  }

  async registerAuth(serverName: string, authInfo: AuthFunctionInfo) {
    this._authFunctions.set(serverName, authInfo)
  }

  async runAuth(params: GleeQuoreAuthFunctionEvent) {
    const { serverName, done } = params
    const auth = this._authFunctions.get(serverName)
    if (!auth) {
      console.error(`Missing Authentication function for server "${serverName}".`)
      done(false, 422, 'Cannot find authentication function')
      return
    }
    await auth.serverAuth(params)
  }

  async clientAuthConfig(serverName: string) {
    return this._authFunctions.get(serverName)?.clientAuth
  }

  async on(operationId: string, func: GleeQuoreFunction) {
    try {
      const operation = this.asyncapi.operations().get(operationId)
      if (!operation) {
        throw new Error(`There's no operation with ID "${operationId}" in your AsyncAPI document.`)
      } else if (operation.action() !== 'receive') {
        throw new Error(`The operation with ID "${operationId}" has been defined as a "receive" operation in your AsyncAPI document. You can only call «.on()» over "receive" operations.`)
      }
      debug(`Registering operation: ${operationId}`)
      this._functions.set(operationId, {
        run: func,
      })
    } catch(err: unknown) {
      this.emitInternalEvent('error', err)
    }
  }

  async runFunction(operationId: string, message: GleeQuoreMessage) {
    try {
      debug(`Triggering function for operation ID: ${operationId}`)
      const operation = this.asyncapi.operations().get(operationId)
      if (!operation) {
        throw new Error(`Error triggering operation with ID "${operationId}". There's no operation with such ID in your AsyncAPI document.`)
      }
      const operationFunction = this._functions.get(operationId)
      if (!operationFunction) {
        throw new Error(`Error triggering operation with ID "${operationId}". No operation has been registered with such ID. Please, register an operation with such ID as follows: «.on('${operationId}', (message) => { /* Your business logic here... */ })».`)
      }
      message.operation = operation
      await operationFunction.run({
        payload: message.payload,
        query: message.query,
        headers: message.headers,
        request: message.request,
        channel: message.channel,
        connection: message.connection,
        serverName: message.serverName,
        app: this,
      } as GleeQuoreFunctionEvent)
    } catch (err: unknown) {
      this.emitInternalEvent('error', err)
    }
  }

  async registerLifecycleEvent(lifecycleEvent: LifecycleEvent, func: GleeQuoreLifecycleFunction, serverNames?: string[]) {
    if (!this._lifecycleEvents.has(lifecycleEvent)) {
      this._lifecycleEvents.set(lifecycleEvent, [])
    }

    this._lifecycleEvents.set(lifecycleEvent, [
      ...this._lifecycleEvents.get(lifecycleEvent),
      {
        func,
        servers: serverNames,
      },
    ])
  }

  async runLifecycleEvent(lifecycleEvent: LifecycleEvent, params: GleeQuoreLifecycleEvent) {
    try {
      if (!Array.isArray(this._lifecycleEvents.get(lifecycleEvent))) return

      const connectionServer = params.connection.serverName
      const handlers = this._lifecycleEvents.get(lifecycleEvent).filter((info) => {
        if (info.servers) {
          return info.servers.includes(connectionServer)
        }

        return true
      })

      if (!handlers.length) return

      debug(`Running ${lifecycleEvent} lifecycle event...`)

      await Promise.all(handlers.map((info) => info.func(params)))
    } catch (err: unknown) {
      this.emitInternalEvent('error', err)
    }
  }

  async onConnect(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onConnect, func)
  }

  async onConnectToServer(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onConnect, func, [serverName])
  }

  async onConnectToServers(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onConnect, func, serverNames)
  }

  async onReconnect(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onReconnect, func)
  }

  async onReconnectToServer(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onReconnect, func, [serverName])
  }

  async onReconnectToServers(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onReconnect, func, serverNames)
  }

  async onDisconnect(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onDisconnect, func)
  }

  async onDisconnectFromServer(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onDisconnect, func, [serverName])
  }

  async onDisconnectFromServers(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onDisconnect, func, serverNames)
  }

  async onAllServersConnectionClose(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionClose, func)
  }

  async onServerConnectionCloses(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionClose, func, [serverName])
  }

  async onServersConnectionClose(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionClose, func, serverNames)
  }

  async onAllServersConnectionOpen(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionOpen, func)
  }

  async onServerConnectionOpens(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionOpen, func, [serverName])
  }

  async onServersConnectionOpen(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerConnectionOpen, func, serverNames)
  }

  async onAllServersReady(func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerReady, func)
  }

  async onServerReady(serverName: string, func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerReady, func, [serverName])
  }

  async onServersReady(serverNames: string[], func: GleeQuoreLifecycleFunction) {
    this.registerLifecycleEvent(LifecycleEvent.onServerReady, func, serverNames)
  }

  async onError(errorCallback: (err: Error) => void) {
    this._internalEvents.on('error', errorCallback)
  }

  private async registerAdapters() {
    const serverNames = await this.getSelectedServerNames()

    serverNames.forEach((serverName) => {
      const server: ServerInterface = this.asyncapi.servers().get(serverName)

      if (!server) {
        throw new Error(
          `Server "${serverName}" is not defined in the AsyncAPI file.`
        )
      }

      const protocol = server.protocol()
      const remoteServers = this.asyncapi.extensions().get('x-remoteServers')?.value()
      if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
        this.addAdapter(MqttAdapter, {
          serverName,
          server,
          asyncapi: this.asyncapi,
        })
      } else if (['kafka', 'kafka-secure'].includes(protocol)) {
        this.addAdapter(KafkaAdapter, {
          serverName,
          server,
          asyncapi: this.asyncapi,
        })
      } else if (['amqp', 'amqps'].includes(protocol)) {
        // TODO: Implement AMQP support
      } else if (['ws', 'wss'].includes(protocol)) {
        const configWsAdapter = this.options?.ws?.server?.adapter
        if (remoteServers && remoteServers.includes(serverName)) {
          this.addAdapter(WebsocketClientAdapter, {
            serverName,
            server,
            asyncapi: this.asyncapi,
          })
        } else {
          if (!configWsAdapter || configWsAdapter === 'native') {
            this.addAdapter(WebSocketServerAdapter, {
              serverName,
              server,
              asyncapi: this.asyncapi,
            })
          } else if (configWsAdapter === 'socket.io') {
            this.addAdapter(SocketIOAdapter, {
              serverName,
              server,
              asyncapi: this.asyncapi,
            })
          } else if (typeof configWsAdapter === 'object') {
            this.addAdapter(configWsAdapter, {
              serverName,
              server,
              asyncapi: this.asyncapi,
            })
          } else {
            throw new Error(
              `Unknown value for websocket.adapter found in glee.config.js: ${this.options?.ws?.server?.adapter}. Allowed values are 'native-websocket', 'socket.io', or a reference to a custom Glee adapter.`
            )
          }
        }
      } else if (['http', 'https'].includes(protocol)) {
        if (remoteServers && remoteServers.includes(serverName)) {
          this.addAdapter(HttpClientAdapter, {
            serverName,
            server,
            asyncapi: this.asyncapi,
          })
        } else {
          this.addAdapter(HttpServerAdapter, {
            serverName,
            server,
            asyncapi: this.asyncapi,
          })
        }
      } else {
        // TODO: Improve error message with link to repo encouraging the developer to contribute.
        throw new Error(`Protocol "${server.protocol()}" is not supported yet.`)
      }
    })

    if (this.options.cluster) {
      const { adapter } = this.options.cluster

      if (!adapter || adapter === 'redis') {
        this.setClusterAdapter(RedisClusterAdapter)
      } else if (typeof adapter === 'function') {
        this.setClusterAdapter(adapter)
      } else {
        throw new Error(`Unknown value for cluster.adapter in glee.config.js`)
      }
    }
  }

  async getSelectedServerNames(): Promise<string[]> {
    const { includeServers: selectedServerNames } = this.options
    if (!selectedServerNames || selectedServerNames.length === 0) {
      return this.asyncapi.servers().all().map(e => e.id())
    }

    return this.asyncapi.servers().all().map(e => e.id()).filter((name) => {
      return selectedServerNames.includes(name)
    })
  }
}
