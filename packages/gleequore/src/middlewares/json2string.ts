import { MiddlewareCallback } from './index.js'
import GleeQuoreMessage from '../lib/message.js'

export default (message: GleeQuoreMessage, next: MiddlewareCallback) => {
  try {
    message.payload = JSON.stringify(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
