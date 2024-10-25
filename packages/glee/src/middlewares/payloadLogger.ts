import { logJSON } from '../lib/logger.js'
import GleeMessage from '../lib/message.js'
import { MiddlewareCallback } from './index.js'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  logJSON(message.payload)
  next()
}
