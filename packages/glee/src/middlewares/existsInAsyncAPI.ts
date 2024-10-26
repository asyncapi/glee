import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (asyncapi: AsyncAPIDocument) =>
  (event: GleeMessage, next: MiddlewareCallback) => {
    const messageChannel = asyncapi.channels().get(event.channel)
    if (!messageChannel) {
      return next(new Error(`Invalid or undefined channel: '${event.channel}'. Ensure that '${event.channel}' is both a valid name and defined in the AsyncAPI file.`))
    }
    const receiveOperations = messageChannel.operations().filterByReceive()
    const sendOperations = messageChannel.operations().filterBySend()
    if (event.isInbound()) {
      const hasReceiveOperations = receiveOperations.length > 0
      if (!hasReceiveOperations) {
        return next(new Error(`Failed to receive message: No 'receive' operation defined for channel "${messageChannel.id()}". Please verify that your AsyncAPI specification file a 'receive' operation for this channel.`))
      }
    }

    if (event.isOutbound()) {
      const hasSendOperations = sendOperations.length > 0
      const hasReplyInOperation = receiveOperations.some(operation => operation.reply)
      if (!hasSendOperations && !hasReplyInOperation) {
        return next(new Error(`Failed to send message: No 'send' operation defined for channel "${messageChannel.id()}" or your 'receive' operation doesn't have a 'reply' field. Please verify that your AsyncAPI file includes a 'send' operation for this channel.`))
      }
    }


    return next()
  }
