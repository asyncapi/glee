import { Schema } from '@asyncapi/parser'
import ValidationError from '../errors/validation.js'
import GleeMessage from '../lib/message.js'
import { validateData } from '../lib/util.js'

export default (schema: Schema) => (event: GleeMessage, next: Function) => {
  const { humanReadableError, errors, isValid } = validateData(event.payload, schema)
  if (!isValid) {
    return next(new ValidationError({
      humanReadableError,
      errors,
    }))
  }
  next()
}