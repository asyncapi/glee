import { AsyncAPIDocumentInterface as AsyncAPIDocument, MessagesInterface } from '@asyncapi/parser'
import Ajv from 'ajv'
import betterAjvErrors from 'better-ajv-errors'
import { pathToRegexp } from 'path-to-regexp'

export interface IValidateDataReturn {
  errors?: void | betterAjvErrors.IOutputError[]
  humanReadableError?: void | betterAjvErrors.IOutputError[]
  isValid: boolean | PromiseLike<any>
}

/**
 * Determines if a path matches a channel, and returns the matching params and its values.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 */
export const getParams = (
  path: string,
  channel: string
): { [key: string]: string } | null => {
  if (path === undefined) return {}

  const keys = []
  const re = pathToRegexp(path, keys)
  const result = re.exec(channel)

  if (result === null) return null

  return keys
    .map((key, index) => ({ [key.name]: result[index + 1] }))
    .reduce(
      (prev, val) => ({
        ...prev,
        ...val,
      }),
      {}
    )
}

/**
 * Determines if a path matches a channel.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 * @return {Boolean}
 */
export const matchChannel = (path: string, channel: string): boolean => {
  return getParams(path, channel) !== null
}

/**
 * Validates data against a given JSON Schema definition
 *
 * @private
 * @param {Any} data The data to validate
 * @param {Object} schema A JSON Schema definition
 * @returns Object
 */
export const validateData = (
  data: any,
  schema: object
): IValidateDataReturn => {
  const ajv = new Ajv({ allErrors: true, jsonPointers: true })
  const validation = ajv.compile(schema)
  const isValid = validation(data || null)
  let errors: void | betterAjvErrors.IOutputError[]
  let humanReadableError: void | betterAjvErrors.IOutputError[]
  if (!isValid) {
    humanReadableError = betterAjvErrors(schema, data, validation.errors, {
      format: 'cli',
      indent: 2,
    })
    errors = betterAjvErrors(schema, data, validation.errors, {
      format: 'js',
    })
  }
  return {
    errors,
    humanReadableError,
    isValid,
  }
}

export const isRemoteServer = (
  parsedAsyncAPI: AsyncAPIDocument,
  serverName: string
): boolean => {
  const remoteServers = parsedAsyncAPI.extensions().get('x-remoteServers')?.value()
  if (remoteServers) {
    return remoteServers.includes(serverName)
  }
  return false
}

export const resolveFunctions = async (object: any) => {
  for (const key in object) {
    if (
      typeof object[String(key)] === 'object' &&
      !Array.isArray(object[String(key)])
    ) {
      await resolveFunctions(object[String(key)])
    } else if (typeof object[String(key)] === 'function' && key !== 'auth') {
      object[String(key)] = await object[String(key)]()
    }
  }
}


function jsonPointer(obj: any, pointer: string): any {
  const parts = pointer.split('/').slice(1)
  let current = obj

  for (const part of parts) {
    if (current === null || typeof current !== 'object') {
      return undefined
    }
    // eslint-disable-next-line
    current = current[part]
  }

  return current
}

export function extractExpressionValueFromMessage(message: { headers: any, payload: any }, expression: string): any {

  // Parse the expression
  // eslint-disable-next-line
  const match = expression.match(/^\$message\.(header|payload)(#.*)?$/)
  if (!match) {
    throw new Error(`${expression} is invalid.`)
  }

  const source = match[1]
  const fragment = match[2] ? match[2].slice(1) : undefined
  const headers = message?.headers
  const payload = message?.payload
  // Extract value based on source and fragment
  if (source === 'header') {
    return fragment ? jsonPointer(headers, fragment) : headers
  } else if (source === 'payload') {
    return fragment ? jsonPointer(payload, fragment) : payload
  } else {
    throw new Error(`${expression} source should be "header" or "fragment"`)
  }
}

export function getMessagesSchema(operation: { messages: () => MessagesInterface }) {
  const messagesSchemas = operation.messages().all().map(m => m.payload().json()).filter(schema => !!schema)
  return {
    oneOf: messagesSchemas
  }
}
