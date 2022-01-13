import { logInboundMessage, logOutboundMessage } from '../lib/logger'
import GleeMessage from '../lib/message'
import { MiddlewareCallback } from './index'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  if (message.isInbound()) {
    logInboundMessage(message)
  } else if (message.isOutbound()) {
    logOutboundMessage(message)
  }
  next()
}
