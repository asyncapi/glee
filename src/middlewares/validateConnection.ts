import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (event: GleeMessage, next: MiddlewareCallback) => {
  if (!event.connection) return next()
  const { connection, channel } = event
  if (!connection.hasChannel(channel)) {
    return next(new Error(`Can't send a message to channel ${channel} using this connection.`))
  }
  next()
}
