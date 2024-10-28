import GleeQuoreMessage from '../lib/message.js'

export type Middleware = (
  message: GleeQuoreMessage,
  next: MiddlewareCallback
) => void
export type ErrorMiddleware = (
  error: Error,
  message: GleeQuoreMessage,
  next: MiddlewareCallback
) => void
export type MiddlewareCallback = (error?: Error, message?: GleeQuoreMessage) => void
