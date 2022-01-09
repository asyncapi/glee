import { logInboundMessage, logOutboundMessage } from '../lib/logger.js'
import GleeMessage from '../lib/message.js'

export default (message: GleeMessage, next: Function) => {
  if (message.isInbound()) {
    logInboundMessage(message)
  } else if (message.isOutbound()) {
    logOutboundMessage(message)
  }
  next()
}
