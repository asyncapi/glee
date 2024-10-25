import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  try {
    message.payload = JSON.stringify(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
