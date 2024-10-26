import { AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'
import { MiddlewareCallback } from './index.js'
import GleeQuoreMessage from '../lib/message.js'

export default (asyncapi: AsyncAPIDocument) =>
  function existsInAsyncAPI(event: GleeQuoreMessage, next: MiddlewareCallback) {
    const messageChannel = asyncapi.channels().get(event.channel)
    if (!messageChannel) {
      return next(new Error(`Invalid or undefined channel: '${event.channel}'. Ensure that '${event.channel}' is both a valid name and defined in the AsyncAPI file.`))
    }
    const receiveOperations = messageChannel.operations().filterByReceive()
    const sendOperations = messageChannel.operations().filterBySend()
    if (event.isInbound()) {
      const hasReceiveOperations = receiveOperations.length > 0
      if (!hasReceiveOperations) {
        return next(new Error(`Your application is receiving a message on channel "${messageChannel.id()}" but none of the operations in your AsyncAPI document defines such behavior. If you belive your code is correct, you may want to add a 'receive' operation or a «reply» field to a 'send' operation in your AsyncAPI document.  Otherwise, check your code.`))
      }
    }

    if (event.isOutbound()) {
      const hasSendOperations = sendOperations.length > 0
      const hasReplyInOperation = receiveOperations.some(operation => operation.reply())
      if (!hasSendOperations && !hasReplyInOperation) {
        return next(new Error(`Your application is trying to send a message to channel "${messageChannel.id()}" but none of the operations in your AsyncAPI document defines such behavior. If you believe your code is correct, you may want to add a 'send' operation or a «reply» field to a 'receive' operation in your AsyncAPI document. Otherwise, check your code.`))
      }
    }


    return next()
  }
