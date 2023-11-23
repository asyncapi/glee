import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (asyncapi: AsyncAPIDocument) =>
  (event: GleeMessage, next: MiddlewareCallback) => {
    const messageChannel = asyncapi.channels().get(event.channel)
    if (!messageChannel) {
      return next(new Error(`Invalid or undefined channel: '${event.channel}'. Ensure that '${event.channel}' is both a valid name and defined in the AsyncAPI file.`))
    }
    const sendOperations = messageChannel.operations().filterBySend()
    if (sendOperations.length === 0 && event.isOutbound()) {
      return next(new Error(`Failed to send message: No 'send' operation defined for channel "${messageChannel.id()}". Please verify that your AsyncAPI file includes a 'send' operation for this channel.`))
    }

    const receiveOperations = messageChannel.operations().filterByReceive()
    if (receiveOperations.length === 0 && event.isInbound()) {
      return next(new Error(`Failed to receive message: No 'receive' operation defined for channel "${messageChannel.id()}". Please verify that your AsyncAPI specification file a 'receive' operation for this channel.`))
    }

    return next()
  }
