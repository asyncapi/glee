
import {Writable} from 'stream'
import GleeMessage from './message.js'
import GleeRouter, { ChannelErrorMiddlewareTuple, ChannelMiddlewareTuple } from './router.js'
import { duplicateMessage, getParams, matchChannel } from './util.js'
import { MiddlewareCallback } from '../middlewares/index.js'
import async from 'async'
import debug from 'debug'
import { logInfoMessage } from './logger.js'
export class MessageProcessor extends Writable {
  private middlewares: ChannelMiddlewareTuple[]
  private errorMiddlewares: ChannelErrorMiddlewareTuple[]


  constructor(router: GleeRouter){
    super({ objectMode: true,highWaterMark: 1})
    this.middlewares = router.getMiddlewares()
    this.errorMiddlewares = router.getErrorMiddlewares()

  }

  _write(message: GleeMessage, encoding: BufferEncoding, callback){

    message.setInbound()
    const mws =
      this.middlewares
        .filter(mw => matchChannel(mw.channel, message.channel))
        .map(mw => (msg: GleeMessage, next: MiddlewareCallback) => {
          const msgForMiddleware: GleeMessage = duplicateMessage(msg)
          msgForMiddleware.params = getParams(mw.channel, msgForMiddleware.channel)
          mw.fn.call(mw.fn, msgForMiddleware, (err: Error, newMessage: GleeMessage) => {
            const nextMessage = newMessage || msgForMiddleware
            nextMessage.channel = message.channel // This is to avoid the channel to be modified.
            next(err, nextMessage)
          })
        })

    async.seq(...mws)(message, (err: Error, msg: GleeMessage) => {
      if (err) {
        message.notifyFailedProcessing(err)
        debug('Error encountered while processing middlewares.')
        this._processError(err, msg)
        callback()
        return
      }

        message.notifySuccessfulProcessing()
        debug('Inbound pipeline finished.')
        callback()
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
    private _processError (error: Error, message: GleeMessage): void {
      const emws = this.errorMiddlewares.filter(emw => matchChannel(emw.channel, message.channel))
      if (!emws.length) return
  
      this._execErrorMiddleware(emws, 0, error, message)
    }
  
    private _execErrorMiddleware (emws: ChannelErrorMiddlewareTuple[], index: number, error: Error, message: GleeMessage) {
      const emwsLength = emws.length
      emws[(index + emwsLength) % emwsLength].fn(error, message, (err: Error) => {
        if (!emws[index+1]) return
        this._execErrorMiddleware.call(null, emws, index+1, err, message)
      })
    }
}