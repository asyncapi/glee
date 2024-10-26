import { MiddlewareCallback } from './index.js'
import GleeQuoreMessage from '../lib/message.js'

export default function buffer2string(message: GleeQuoreMessage, next: MiddlewareCallback) {
  if (message.payload instanceof Buffer) {
    message.payload = message.payload.toString()
  }

  next()
}
