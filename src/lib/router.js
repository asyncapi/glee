class GleeRouter {
  /**
   * Instantiates a GleeRouter.
   */
  constructor (options) {
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
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  use (...args) {
    if (!args || !args.length) {
      console.error('GleeRouter.use() requires at least one argument.')
      return
    }

    if (args.length === 1 && args[0] instanceof GleeRouter) {
      this.addMiddlewares(args[0].getMiddlewares())
      this.addErrorMiddlewares(args[0].getErrorMiddlewares())
      this.addOutboundMiddlewares(args[0].getOutboundMiddlewares())
      this.addOutboundErrorMiddlewares(args[0].getOutboundErrorMiddlewares())
    } else if (args.length === 2 && typeof args[0] === 'string' && args[1] instanceof GleeRouter) {
      this.addMiddlewares(args[1].getMiddlewares(), args[0])
      this.addErrorMiddlewares(args[1].getErrorMiddlewares(), args[0])
      this.addOutboundMiddlewares(args[1].getOutboundMiddlewares(), args[0])
      this.addOutboundErrorMiddlewares(args[1].getOutboundErrorMiddlewares(), args[0])
    } else {
      let channel
      let functions = []

      if (typeof args[0] === 'string') {
        channel = args[0]
        functions = args.splice(1)
      } else {
        functions = args
      }

      const mws = functions.map(fn => ({ channel, fn }))

      mws.forEach(mw => {
        if (typeof mw.fn !== 'function') return

        if (mw.fn.length <= 2) {
          this.addMiddlewares([mw])
        } else {
          this.addErrorMiddlewares([mw])
        }
      })
    }
  }

  /**
   * Use a middleware for outbound messages.
   *
   * @param {String} [channel] The channel you want to scope the middleware to.
   * @param {Function|GleeRouter} ...middlewares A function or GleeRouter to use as a middleware.
   */
  useOutbound (...args) {
    if (!args || !args.length) {
      console.error('GleeRouter.useOutbound() requires at least one argument.')
      return
    }

    if (args.length === 1 && args[0] instanceof GleeRouter) {
      this.addOutboundMiddlewares(args[0].getOutboundMiddlewares())
      this.addOutboundErrorMiddlewares(args[0].getOutboundErrorMiddlewares())
    } else if (args.length === 2 && typeof args[0] === 'string' && args[1] instanceof GleeRouter) {
      this.addOutboundMiddlewares(args[1].getOutboundMiddlewares(), args[0])
      this.addOutboundErrorMiddlewares(args[1].getOutboundErrorMiddlewares(), args[0])
    } else {
      let channel
      let functions = []

      if (typeof args[0] === 'string') {
        channel = args[0]
        functions = args.splice(1)
      } else {
        functions = args
      }

      const mws = functions.map(fn => ({ channel, fn }))

      mws.forEach(mw => {
        if (typeof mw.fn !== 'function') return

        if (mw.fn.length <= 2) {
          this.addOutboundMiddlewares([mw])
        } else {
          this.addOutboundErrorMiddlewares([mw])
        }
      })
    }
  }

  /**
   * Returns all the inbound middlewares.
   * @return {Array<Function>}
   */
  getMiddlewares () {
    return this.middlewares
  }

  /**
   * Returns all the outbound middlewares.
   * @return {Array<Function>}
   */
  getOutboundMiddlewares () {
    return this.outboundMiddlewares
  }

  /**
   * Returns all the inbound error middlewares.
   * @return {Array<Function>}
   */
  getErrorMiddlewares () {
    return this.errorMiddlewares
  }

  /**
   * Returns all the outbound error middlewares.
   * @return {Array<Function>}
   */
  getOutboundErrorMiddlewares () {
    return this.outboundErrorMiddlewares
  }

  /**
   * Adds a normalized middleware to a target collection.
   *
   * @param {Array} target The target collection.
   * @param {Array} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   * @private
   */
  _addMiddlewares (target, middlewares, channel) {
    middlewares.forEach(mw => {
      if (channel) {
        const compoundchannel = mw.channel ? `${channel}/${mw.channel}` : channel
        target.push({ ...mw, ...{ channel: compoundchannel } })
      } else {
        target.push(mw)
      }
    })
  }

  /**
   * Adds a normalized middleware to the inbound middlewares collection.
   *
   * @param {Array} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addMiddlewares (middlewares, channel) {
    this._addMiddlewares(this.middlewares, middlewares, channel)
  }

  /**
   * Adds a normalized middleware to the outbound middlewares collection.
   *
   * @param {Array} middlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addOutboundMiddlewares (middlewares, channel) {
    this._addMiddlewares(this.outboundMiddlewares, middlewares, channel)
  }

  /**
   * Adds a normalized middleware to the inbound error middlewares collection.
   *
   * @param {Array} errorMiddlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addErrorMiddlewares (errorMiddlewares, channel) {
    this._addMiddlewares(this.errorMiddlewares, errorMiddlewares, channel)
  }

  /**
   * Adds a normalized middleware to the outbound error middlewares collection.
   *
   * @param {Array} errorMiddlewares The middlewares to add to the collection.
   * @param {String} [channel] The scope channel.
   */
  addOutboundErrorMiddlewares (errorMiddlewares, channel) {
    this._addMiddlewares(this.outboundErrorMiddlewares, errorMiddlewares, channel)
  }
}

export default GleeRouter
