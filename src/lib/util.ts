import Ajv from 'ajv'
import betterAjvErrors from 'better-ajv-errors'
import { pathToRegexp } from 'path-to-regexp'
import Glee from './glee.js'
import { GleeFunctionEvent } from './index.d'
import GleeMessage from './message.js'

interface IValidateDataReturn {
  errors?: void | betterAjvErrors.IOutputError[],
  humanReadableError?: void | betterAjvErrors.IOutputError[],
  isValid: boolean | PromiseLike<any>,
}

/**
 * Determines if a path matches a channel, and returns the matching params and its values.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 */
export const getParams = (path: string, channel: string): {[key: string]: string} | null => {
  if (path === undefined) return {}

  const keys = []
  const re = pathToRegexp(path, keys)
  const result = re.exec(channel)

  if (result === null) return null

  return keys.map((key, index) => ({ [key.name]: result[index + 1] })).reduce((prev, val) => ({
    ...prev,
    ...val,
  }), {})
}

/**
 * Duplicates a GleeMessage.
 *
 * @private
 * @param {GleeMessage} message The message to duplicate.
 * @return {GleeMessage}
 */
export const duplicateMessage = (message: GleeMessage): GleeMessage => {
  const newMessage = new GleeMessage({
    payload: message.payload,
    headers: message.headers,
    channel: message.channel,
    serverName: message.serverName,
    connection: message.connection,
    broadcast: message.broadcast,
    cluster: message.cluster
  })

  if (message.isInbound()) {
    newMessage.setInbound()
  } else {
    newMessage.setOutbound()
  }
  
  return newMessage
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
  return (getParams(path, channel) !== null)
}

/**
 * Validates data against a given JSON Schema definition
 * 
 * @private
 * @param {Any} data The data to validate
 * @param {Object} schema A JSON Schema definition
 * @returns Object
 */
export const validateData = (data: any, schema: object): IValidateDataReturn => {
  const ajv = new Ajv({ allErrors: true, jsonPointers: true })
  const validation = ajv.compile(schema)
  const isValid = validation(data)
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

export const arrayHasDuplicates = (array: any[]) => {
  return (new Set(array)).size !== array.length
}

export const gleeMessageToFunctionEvent = (message: GleeMessage, glee:Glee): GleeFunctionEvent => {
  return {
    payload: message.payload,
    headers: message.headers,
    channel: message.channel,
    connection: message.connection,
    serverName: message.serverName,
    glee,
  } as GleeFunctionEvent
}
