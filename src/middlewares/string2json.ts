import GleeMessage from '../lib/message'
import { MiddlewareCallback } from './index'

export default (message: GleeMessage, next: MiddlewareCallback) => {
  try {
    message.payload = JSON.parse(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
