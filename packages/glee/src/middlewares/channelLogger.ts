import { logInboundChannel, logOutboundChannel } from '../lib/logger.js'
import GleeMessage from '../lib/message.js'
import { MiddlewareCallback } from './index.js'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  if (message.isInbound()) {
    logInboundChannel(message)
  } else if (message.isOutbound()) {
    logOutboundChannel(message)
  }
  next()
}
