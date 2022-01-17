import { logError } from '../lib/logger'
import GleeError from '../errors/glee-error'
import GleeMessage from '../lib/message'
import { MiddlewareCallback } from './index'

export default (err: Error, message: GleeMessage, next: MiddlewareCallback) => {
  if (err instanceof GleeError) {
    if (message && message.isInbound()) {
      err.message = 'You have received a malformed event or there has been error processing it. Please review the error below:'
      logError(err, { showStack: false })
    } else if (message && message.isOutbound()) {
      err.message = 'One of your functions is producing a malformed event or there has been an error processing it. Please review the error below:'
      logError(err, { showStack: false })
    }
  } else {
    logError(err)
  }
  next()
}
