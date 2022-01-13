import { Schema } from '@asyncapi/parser'
import GleeError from '../errors/glee-error'
import GleeMessage from '../lib/message'
import { validateData } from '../lib/util'
import { MiddlewareCallback } from './index'

export default (schema: Schema) => (event: GleeMessage, next: MiddlewareCallback) => {
  const { humanReadableError, errors, isValid } = validateData(event.payload, schema)
  if (!isValid) {
    return next(new GleeError({
      humanReadableError,
      errors,
    }))
  }
  next()
}
