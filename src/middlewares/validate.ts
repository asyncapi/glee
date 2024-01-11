import { AsyncAPISchema } from '@asyncapi/parser'
import GleeError from '../errors/glee-error.js'
import GleeMessage from '../lib/message.js'
import { validateData } from '../lib/util.js'
import { MiddlewareCallback } from './index.js'

export default (schema: AsyncAPISchema) =>
  (event: GleeMessage, next: MiddlewareCallback) => {
    const { humanReadableError, errors, isValid } = validateData(
      event.payload,
      schema as any
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
