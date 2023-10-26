import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage, logError } from './logger.js'
import GleeMessage from './message.js'
import { GleeFunction } from './index.js'
import Glee from './glee.js'
import {
  gleeMessageToFunctionEvent,
  validateData,
  isRemoteServer,
} from './util.js'
import { pathToFileURL } from 'url'
import GleeError from '../errors/glee-error.js'
import { getParsedAsyncAPI } from './asyncapiFile.js'
import Debug from 'debug'
const debug = Debug('glee:functions')

interface FunctionInfo {
  run: GleeFunction
}

const OutboundMessageSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: {
      type: 'object',
      propertyNames: { type: 'string' },
      additionalProperties: { type: 'string' },
    },
    channel: { type: 'string' },
    server: { type: 'string' },
    query: { type: 'object' },
  },
}
const FunctionReturnSchema = {
  type: ['object', 'null'],
  properties: {
    send: {
      type: 'array',
      items: OutboundMessageSchema,
    },
    reply: {
      type: 'array',
      items: OutboundMessageSchema,
    },
  },
  additionalProperties: false,
  anyOf: [{ required: ['send'] }, { required: ['reply'] }],
}

const { GLEE_DIR, GLEE_FUNCTIONS_DIR } = getConfigs()
export const functions: Map<string, FunctionInfo> = new Map()

export async function register(dir: string) {
  debug(`Attempting to register functions from directory: ${dir}`)
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()){
      debug('Provided path is not a directory. Skipping.')
      return
    }
  } catch (e) {
    debug(`Error while checking directory: ${e}`)
    throw e
  }

  try {
    const files = await walkdir.async(dir, { return_object: true })
    debug(`Found function files: ${Object.keys(files)}`)

    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const functionName = basename(filePath, extname(filePath))
          debug(`Registering function: ${functionName}`)

          const { default: fn } = await import(pathToFileURL(filePath).href)
          functions.set(functionName, {
            run: fn,
          })
        } catch (e) {
          debug(`Error while registering function:`)
          console.error(e)
        }
      })
    )
  } catch (e) {
    debug(`Error while walking directory:`)
    console.error(e)
  }
}

export async function trigger({
  app,
  operationId,
  message,
}: {
  app: Glee
  operationId: string
  message: GleeMessage
}) {
  try {
    debug(`Triggering function for operation ID: ${operationId}`)
    const parsedAsyncAPI = await getParsedAsyncAPI()

    const operationFunction = functions.get(operationId)
    if(!operationFunction){
      const errMsg = `Failed to trigger function: No function registered for operation ID "${operationId}". please make sure you have a function named: "${operationId}(.js|.ts)" in your functions directory.`
      logError(new Error(errMsg ), {
        highlightedWords: [`"${operationId}"`],
      })
      return
    }
    let functionResult = await operationFunction.run(gleeMessageToFunctionEvent(message, app))
    if (functionResult === undefined) functionResult = null
    const { humanReadableError, errors, isValid } = validateData(
      functionResult,
      FunctionReturnSchema
    )

    if (!isValid) {
      debug(`Function ${operationId} returned invalid data.`)
      const err = new GleeError({
        humanReadableError,
        errors,
      })
      err.message = `Function ${operationId} returned invalid data.`

      logError(err, {
        highlightedWords: [operationId],
      })

      return
    }

    functionResult?.send?.forEach((msg) => {
      const localServerProtocols = ['ws', 'wss', 'http', 'https']
      const serverProtocol = parsedAsyncAPI.servers().get(msg.server || message.serverName).protocol().toLocaleLowerCase()
      const isBroadcast =
        localServerProtocols.includes(serverProtocol) &&
        !isRemoteServer(parsedAsyncAPI, msg.server)
      app.send(
        new GleeMessage({
          payload: msg.payload,
          query: msg.query,
          headers: msg.headers,
          channel: msg.channel || message.channel,
          serverName: msg.server,
          broadcast: isBroadcast,
        })
      )
    })

    functionResult?.reply?.forEach((msg) => {
      message.reply({
        payload: msg.payload,
        headers: msg.headers,
        channel: msg.channel,
      })
    })
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      const functionsPath = relative(GLEE_DIR, GLEE_FUNCTIONS_DIR)
      const missingFile = relative(GLEE_FUNCTIONS_DIR, `${operationId}.js`)
      const missingPath = join(functionsPath, missingFile)
      logWarningMessage(`Missing function file ${missingPath}.`, {
        highlightedWords: [missingPath],
      })
    } else {
      throw err
    }
  }
}