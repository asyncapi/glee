import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (asyncapi: AsyncAPIDocument) =>
  (event: GleeMessage, next: MiddlewareCallback) => {
    if (typeof event.channel !== 'string') {
      return next(new Error(`Invalid channel name: ${event.channel}.`))
    }
    if (asyncapi.channels().get(event.channel)) return next()
    next(
      new Error(`Channel ${event.channel} is not defined in the AsyncAPI file.`)
    )
  }
