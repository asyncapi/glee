import { ErrorMiddleware, Middleware } from '../middlewares/index.js'

export type ChannelMiddlewareTuple = {
  channel: string
  fn: Middleware
}

export type ChannelErrorMiddlewareTuple = {
  channel: string
  fn: ErrorMiddleware
}

export type GenericMiddleware = Middleware | ErrorMiddleware
export type GenericChannelMiddlewareTuple =
  | ChannelMiddlewareTuple
  | ChannelErrorMiddlewareTuple

class GleeRouter {
  private middlewares: ChannelMiddlewareTuple[]
  private outboundMiddlewares: ChannelMiddlewareTuple[]
  private errorMiddlewares: ChannelErrorMiddlewareTuple[]
  private outboundErrorMiddlewares: ChannelErrorMiddlewareTuple[]

  /**
   * Instantiates a GleeRouter.
   */
  constructor() {
    this.middlewares = []
    this.outboundMiddlewares = []
    this.errorMiddlewares = []
    this.outboundErrorMiddlewares = []
  }

  /**
   * Use a middleware for inbound messages. Please, note that when passing a GleeRouter as a param,
   * this function will make use of inbound and outbound middlewares.
   *
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {GenericMiddleware} middleware A middleware function.
   */
  use(...middlewares: GenericMiddleware[]): void
  use(channel: string, ...middlewares: GenericMiddleware[]): void
  use(
    channel: string | GenericMiddleware,
    ...middlewares: GenericMiddleware[]
  ): void {
    const mws: GenericChannelMiddlewareTuple[] =
      this.middlewaresToChannelMiddlewaresTuples(channel, ...middlewares)

    mws.forEach((mw) => {
      if (mw.fn.length <= 2) {
        this.addMiddlewares([mw as ChannelMiddlewareTuple])
      } else {
        this.addErrorMiddlewares([mw as ChannelErrorMiddlewareTuple])
      }
    })
  }

  /**
   * Use a middleware for outbound messages.
   *
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  useOutbound(...middlewares: GenericMiddleware[]): void
  useOutbound(channel: string, ...middlewares: GenericMiddleware[]): void
  useOutbound(
    channel: string | GenericMiddleware,
    ...middlewares: GenericMiddleware[]
  ) {
    const mws: GenericChannelMiddlewareTuple[] =
      this.middlewaresToChannelMiddlewaresTuples(channel, ...middlewares)

    mws.forEach((mw) => {
      if (mw.fn.length <= 2) {
        this.addOutboundMiddlewares([mw as ChannelMiddlewareTuple])
      } else {
        this.addOutboundErrorMiddlewares([mw as ChannelErrorMiddlewareTuple])
      }
    })
  }

  private middlewaresToChannelMiddlewaresTuples(
    channel: string | GenericMiddleware,
    ...middlewares: GenericMiddleware[]
  ): GenericChannelMiddlewareTuple[] {
    const realChannel = typeof channel === 'string' ? channel : undefined
    const allMiddlewares: GenericMiddleware[] = realChannel
      ? middlewares
      : [channel as GenericMiddleware].concat(middlewares)
    return allMiddlewares.map(
      (fn) =>
        ({
          channel: realChannel,
          fn,
        } as GenericChannelMiddlewareTuple)
    )
  }

  /**
   * Returns all the inbound middlewares.
   * @return {Array<ChannelMiddlewareTuple>}
   */
  getMiddlewares(): ChannelMiddlewareTuple[] {
    return this.middlewares
  }

  /**
   * Returns all the outbound middlewares.
   * @return {Array<ChannelMiddlewareTuple>}
   */
  getOutboundMiddlewares(): ChannelMiddlewareTuple[] {
    return this.outboundMiddlewares
  }

  /**
   * Returns all the inbound error middlewares.
   * @return {Array<ChannelErrorMiddlewareTuple>}
   */
  getErrorMiddlewares(): ChannelErrorMiddlewareTuple[] {
    return this.errorMiddlewares
  }

  /**
   * Returns all the outbound error middlewares.
   * @return {Array<ChannelErrorMiddlewareTuple>}
   */
  getOutboundErrorMiddlewares(): ChannelErrorMiddlewareTuple[] {
    return this.outboundErrorMiddlewares
  }

  /**
   * Adds a normalized middleware to a target collection.
   *
   * @param {Array<GenericChannelMiddlewareTuple>} target The target collection.
   * @param {Array<GenericChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   * @private
   */
  private _addMiddlewares(
    target: GenericChannelMiddlewareTuple[],
    middlewares: GenericChannelMiddlewareTuple[],
    channel: string
  ) {
    middlewares.forEach((mw) => {
      if (channel) {
        const compoundchannel = mw.channel
          ? `${channel}/${mw.channel}`
          : channel
        target.push({ ...mw, ...{ channel: compoundchannel } })
      } else {
        target.push(mw)
      }
    })
  }

  /**
   * Adds a normalized middleware to the inbound middlewares collection.
   *
   * @param {Array<ChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addMiddlewares(middlewares: ChannelMiddlewareTuple[], channel?: string) {
    this._addMiddlewares(this.middlewares, middlewares, channel)
  }

  /**
   * Adds a normalized middleware to the outbound middlewares collection.
   *
   * @param {Array<ChannelMiddlewareTuple>} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addOutboundMiddlewares(
    middlewares: ChannelMiddlewareTuple[],
    channel?: string
  ) {
    this._addMiddlewares(this.outboundMiddlewares, middlewares, channel)
  }

  /**
   * Adds a normalized middleware to the inbound error middlewares collection.
   *
   * @param {Array<ChannelErrorMiddlewareTuple>} errorMiddlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addErrorMiddlewares(
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    channel?: string
  ) {
    this._addMiddlewares(this.errorMiddlewares, errorMiddlewares, channel)
  }

  /**
   * Adds a normalized middleware to the outbound error middlewares collection.
   *
   * @param {Array<ChannelErrorMiddlewareTuple>} errorMiddlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addOutboundErrorMiddlewares(
    errorMiddlewares: ChannelErrorMiddlewareTuple[],
    channel?: string
  ) {
    this._addMiddlewares(
      this.outboundErrorMiddlewares,
      errorMiddlewares,
      channel
    )
  }
}

export default GleeRouter
