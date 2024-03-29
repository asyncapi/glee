/* eslint-disable @typescript-eslint/no-unused-vars */
import EventEmitter from 'events'
import async from 'async'
import Debug from 'debug'
import { AsyncAPIDocumentInterface as AsyncAPIDocument, ServerInterface as Server } from '@asyncapi/parser'
import GleeAdapter, { GleeAdapterOptions } from './adapter.js'
import GleeClusterAdapter from './cluster.js'
import GleeRouter, {
  ChannelErrorMiddlewareTuple,
  ChannelMiddlewareTuple,
  GenericMiddleware,
} from './router.js'
import GleeMessage from './message.js'
import { matchChannel, duplicateMessage, getParams } from './util.js'
import { GleeConfig } from './index.js'
import GleeConnection from './connection.js'
import { MiddlewareCallback } from '../middlewares/index.js'

const debug = Debug('glee')

type AdapterRecord = {
  Adapter: typeof GleeAdapter
  instance?: GleeAdapter
  serverName: string
  server: Server
  parsedAsyncAPI: AsyncAPIDocument
}

type ClusterAdapterRecord = {
  Adapter: typeof GleeClusterAdapter
  instance?: GleeClusterAdapter
}

export default class Glee extends EventEmitter {
  private _options: GleeConfig
  private _router: GleeRouter
  private _adapters: AdapterRecord[]
  private _clusterAdapter: ClusterAdapterRecord

  /**
   * Instantiates Glee.
   *
   * @param {Object} [options={}]
   */
  constructor(options: GleeConfig = {}) {
    super({ captureRejections: true })

    this.on('error', console.error)

    this._options = options
    this._router = new GleeRouter()
    this._adapters = []
  }

  get options(): GleeConfig {
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
   * @param {GleeAdapter} adapter The adapter.
   * @param {String} serverName The name of the AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIServer} server AsyncAPI Server to use with the adapter.
   * @param {AsyncAPIDocument} parsedAsyncAPI The AsyncAPI document.
   */
  addAdapter(
    Adapter: typeof GleeAdapter,
    {
      serverName,
      server,
      parsedAsyncAPI,
    }: { serverName: string; server: Server | undefined; parsedAsyncAPI: AsyncAPIDocument }
  ) {
    this._adapters.push({ Adapter, serverName, server, parsedAsyncAPI })
  }

  /**
   * Sets the cluster adapter to use.
   *
   * @param {GleeClusterAdapter} adapter The adapter.
   */
  setClusterAdapter(Adapter: typeof GleeClusterAdapter) {
    this._clusterAdapter = {
      Adapter,
    }
  }

  /**
   * Use a middleware for inbound messages.
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
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
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
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
   * Send a message to the adapters.
   *
   * @param {Object|GleeMessage} message The payload of the message you want to send.
   */
  send(message: GleeMessage): void {
    message.setOutbound()

    this._processMessage(
      this._router.getOutboundMiddlewares(),
      this._router.getOutboundErrorMiddlewares(),
      message
    )
  }

  /**
   * Tells the adapters to connect.
   */
  async connect(): Promise<any[]> {
    const promises = []

    this._adapters.forEach((a) => {
      const adapterOptions: GleeAdapterOptions = {
        glee: this,
        serverName: a.serverName,
        server: a.server,
        parsedAsyncAPI: a.parsedAsyncAPI
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
   * Alias for `connect`.
   */
  async listen(): Promise<any[]> {
    return this.connect()
  }

  /**
   * Injects a message into the Glee inbound middleware chain.
   *
   * @param {GleeMessage} message The message you want to send.
   * @param {String} serverName The name of the server this message is coming from.
   * @param {GleeConnection} [connection] The connection used when receiving the message. Its type is unknown and must be handled by the adapters.
   */
  injectMessage(
    message: GleeMessage,
    serverName: string,
    connection: GleeConnection
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
      new GleeMessage({ channel })
    )
  }

  /**
   * Synchronizes the other instances in the cluster with the message.
   *
   * @param {GleeMessage} message
   */
  syncCluster(message: GleeMessage): void {
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
   * @param {GleeMessage} message The message to pass to the middlewares.
   * @private
   */
  private _processMessage(
    middlewares: ChannelMiddlewareTuple[],
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    message: GleeMessage
  ): void {
    const mws = middlewares
      .filter((mw) => matchChannel(mw.channel, message.channel))
      .map((mw) => (msg: GleeMessage, next: MiddlewareCallback) => {
        const msgForMiddleware: GleeMessage = duplicateMessage(msg)
        msgForMiddleware.params = getParams(
          mw.channel,
          msgForMiddleware.channel
        )

        msgForMiddleware.on('send', (m: GleeMessage) => {
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
          (err: Error, newMessage: GleeMessage) => {
            const nextMessage = newMessage || msgForMiddleware
            nextMessage.channel = message.channel // This is to avoid the channel to be modified.
            next(err, nextMessage)
          }
        )
      })

    async.seq(...mws)(message, (err: Error, msg: GleeMessage) => {
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
   * @param {GleeMessage} message The message to pass to the middlewares.
   * @private
   */
  private _processError(
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    error: Error,
    message: GleeMessage
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
    message: GleeMessage
  ) {
    const emwsLength = emws.length
    emws[(index + emwsLength) % emwsLength].fn(error, message, (err: Error) => {
      if (!emws[index + 1]) return
      this._execErrorMiddleware.call(null, emws, index + 1, err, message)
    })
  }
}
