import { GleeFunctionReturn, GleeFunctionReturnInvoke } from '.'
import { validateData, isAValidHttpUrl } from './util.js'
import GleeError from '../errors/glee-error.js'
import { logError } from './logger.js'
import { FunctionReturnSchema, HttpOptionsSchema } from './jsonSchemas.js'

export function validateGleeFunctionReturn(res: GleeFunctionReturn, source: string) {
  const errMessage = isAValidHttpUrl(source)
    ? `URL ${source} returned invalid data. To prevent Glee from processing the response, please set the 'ignoreResponse' option to 'true' in your invoke request.`
    : `Function ${source} returned invalid data.`
  validateAgainstJSONShema(res, FunctionReturnSchema, errMessage)
}
export function validateGleeInvokeOptions(invokeOptions: GleeFunctionReturnInvoke, url: string) {
  const errMessage = `Tried to parse it's options from 'x-glee-invoke' in ${url} operation but It was not successful. Please make sure it has been set correctly.`
  return validateAgainstJSONShema(invokeOptions, HttpOptionsSchema, errMessage)
}

function validateAgainstJSONShema(json, jsonSchema, errorMessage) {
  if (json === undefined) json = null
  const { humanReadableError, errors, isValid } = validateData(json, jsonSchema)

  if (!isValid) {
    const err = new GleeError({
      humanReadableError,
      errors,
    })
    err.message = errorMessage
    logError(err)
    return false
  }

  return true
}
