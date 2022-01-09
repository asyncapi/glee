import { AsyncAPIDocument } from '@asyncapi/parser'
import GleeMessage from '../lib/message'

export default (asyncapi: AsyncAPIDocument) => (event: GleeMessage, next: Function) => {
  if (typeof event.channel !== 'string') return next(new Error(`Invalid channel name: ${event.channel}.`))
  if (asyncapi.channel(event.channel)) return next()
  next(new Error(`Channel ${event.channel} is not defined in the AsyncAPI file.`))
}
