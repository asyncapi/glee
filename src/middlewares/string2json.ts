import GleeMessage from '../lib/message.js'
import { MiddlewareCallback } from './index.js'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  try {
    message.payload = JSON.parse(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
