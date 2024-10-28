import { MiddlewareCallback } from './index.js'
import GleeQuoreMessage from '../lib/message.js'

export default (event: GleeQuoreMessage, next: MiddlewareCallback) => {
  if (!event.connection) return next()
  const { connection, channel } = event
  if (!connection.hasChannel(channel)) {
    const err = new Error(
      `Can't send a message to channel ${channel} using this connection.`
    )
    return next(err)
  }
  next()
}
