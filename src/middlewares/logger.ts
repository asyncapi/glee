import { logInboundMessage, logOutboundMessage } from '../lib/logger.js'
import GleeMessage from '../lib/message.js'
import { MiddlewareCallback } from './index.d'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  if (message.isInbound()) {
    logInboundMessage(message)
  } else if (message.isOutbound()) {
    logOutboundMessage(message)
  }
  next()
}
