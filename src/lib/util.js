import Ajv from 'ajv'
import betterAjvErrors from 'better-ajv-errors'
import { pathToRegexp } from 'path-to-regexp'
import Message from './message.js'

/**
 * Determines if a path matches a channel, and returns an array of matching params.
 *
 * @private
 * @param {String} path The path.
 * @param {String} channel The channel.
 * @return {Object|null}
 */
export const getParams = (path, channel) => {
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
export const duplicateMessage = (message) => {
  const newMessage = new Message({
    payload: message.payload,
    headers: message.headers,
    channel: message.channel,
    serverName: message.serverName,
    connection: message.connection,
    broadcast: message.broadcast,
  })

  if (message.inbound) {
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
export const matchChannel = (path, channel) => {
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
export const validateData = (data, schema) => {
  const ajv = new Ajv({ allErrors: true, strictSchema: false, jsonPointers: true })
  const validation = ajv.compile(schema)
  const isValid = validation(data)
  let errors, humanReadableError
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

export const arrayHasDuplicates = (array) => {
  return (new Set(array)).size !== array.length
}