import { SchemaV2 as Schema } from '@asyncapi/parser'
import GleeError from '../errors/glee-error.js'
import GleeMessage from '../lib/message.js'
import { validateData } from '../lib/util.js'
import { MiddlewareCallback } from './index.js'

export default (schema: Schema) =>
  (event: GleeMessage, next: MiddlewareCallback) => {
    const { humanReadableError, errors, isValid } = validateData(
      event.payload,
      schema
    )
    if (!isValid) {
      return next(
        new GleeError({
          humanReadableError,
          errors,
        })
      )
    }
    next()
  }
