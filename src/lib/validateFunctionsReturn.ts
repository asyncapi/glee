import { GleeFunctionReturn } from '.'
import { validateData } from './util.js'
import GleeError from '../errors/glee-error.js'
import { logError } from './logger.js'

import { URL } from 'url'

const HeadersSchema = {
  type: 'object',
  propertyNames: { type: 'string' },
  additionalProperties: { type: 'string' }
}
const HttpOptionsSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
    headers: HeadersSchema,
    method: { type: 'string' },
    body: {}
  }
}
const OutboundMessageSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: {
      type: 'object',
      propertyNames: { type: 'string' },
      additionalProperties: { type: 'string' }
    },
    channel: { type: 'string' },
    server: { type: 'string' }
  }
}
const FunctionReturnSchema = {
  type: ['object', 'null'],
  properties: {
    send: {
      type: 'array',
      items: OutboundMessageSchema
    },
    reply: {
      type: 'array',
      items: OutboundMessageSchema
    },
    invoke: {
      type: 'array',
      items: HttpOptionsSchema
    }
  },
  additionalProperties: false,
  anyOf: [{ required: ['send'] }, { required: ['reply'] }, { required: ['invoke'] }]
}
export default function validate(res: GleeFunctionReturn, source: string) {
  if (res === undefined) res = null
  const { humanReadableError, errors, isValid } = validateData(res, FunctionReturnSchema)

  if (!isValid) {
    const err = new GleeError({
      humanReadableError,
      errors
    })
    err.message = isAValidUrl(source)
      ? `URL ${source} returned invalid data. To prevent Glee from processing the response, please set the 'ignoreResponse' option to 'true' in your invoke request.`
      : `Function ${source} returned invalid data.`

    logError(err, {
      highlightedWords: [source]
    })

    return false
  }

  return true
}

const isAValidUrl = (s: string) => {
  try {
    new URL(s)
    return s.trim().startsWith('http')
  } catch (err) {
    return false
  }
}
