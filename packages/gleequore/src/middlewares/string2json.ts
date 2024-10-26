import GleeQuoreMessage from '../lib/message.js'
import { MiddlewareCallback } from './index.js'

export default function string2json(message: GleeQuoreMessage, next: MiddlewareCallback) {
  try {
    message.payload = JSON.parse(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
