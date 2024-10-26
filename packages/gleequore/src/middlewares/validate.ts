import { AsyncAPISchema } from '@asyncapi/parser'
import GleeError from '../errors.js'
import GleeQuoreMessage from '../lib/message.js'
import { validateData } from '../lib/util.js'
import { MiddlewareCallback } from './index.js'

export default (schema: AsyncAPISchema, contextErrorMessage = '') =>
  function validate(event: GleeQuoreMessage, next: MiddlewareCallback) {
    const { humanReadableError, errors, isValid } = validateData(
      event.payload,
      schema as any
    )
    if (!isValid) {
      return next(
        new GleeError({
          humanReadableError: `${contextErrorMessage}${humanReadableError}`,
          errors,
        })
      )
    }
    next()
  }
