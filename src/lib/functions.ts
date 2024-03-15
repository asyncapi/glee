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
import { OperationInterface } from '@asyncapi/parser'
const debug = Debug('glee:functions')

interface FunctionInfo {
  run: GleeFunction
}

const HeadersSchema = {
  type: 'object',
  propertyNames: { type: 'string' },
  additionalProperties: { type: 'string' },
}

const ReplyMessageSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: HeadersSchema,
    query: { type: 'object' },
  },
}

const SendMessageSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: HeadersSchema,
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
      items: SendMessageSchema,
    },
    reply: {
      type: 'array',
      items: ReplyMessageSchema,
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
    if (!statsDir.isDirectory()) {
      debug('Provided path is not a directory. Skipping.')
      return
    }
  } catch (e) {
    debug(`Error while checking directory...`)
    throw e
  }

  try {
    const files = await walkdir.async(dir, { return_object: true })

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
  operation,
  message,
}: {
  app: Glee
  operation: OperationInterface
  message: GleeMessage
}) {
  try {
    debug(`Triggering function for operation ID: ${operation.id()}`)
    const parsedAsyncAPI = await getParsedAsyncAPI()
    message.operation = operation
    const operationFunction = functions.get(operation.id())
    if (!operationFunction) {
      const errMsg = `Failed to trigger function: No function registered for operation ID "${operation.id()}". please make sure you have a function named: "${operation.id()}(.js|.ts)" in your functions directory.`
      logError(new Error(errMsg), {
        highlightedWords: [`"${operation.id()}"`],
      })
      return
    }
    let functionResult = await operationFunction.run(gleeMessageToFunctionEvent(message, app))
    if (!functionResult) functionResult = null
    const { humanReadableError, errors, isValid } = validateData(
      functionResult,
      FunctionReturnSchema
    )

    if (!isValid) {
      const err = new GleeError({
        humanReadableError,
        errors,
      })
      err.message = `Function ${operation.id()} returned invalid data.`
      logError(err, {
        highlightedWords: [operation.id()],
      })

      return
    }

    functionResult?.send?.forEach((msg) => {
      const localServerProtocols = ['ws', 'wss', 'http', 'https']
      const serverProtocol = parsedAsyncAPI.servers().get(msg.server || message.serverName).protocol().toLocaleLowerCase()
      const isBroadcast =
        localServerProtocols.includes(serverProtocol) &&
        !isRemoteServer(parsedAsyncAPI, msg.server)
      const channelName = msg.channel || message.channel
      const channel = parsedAsyncAPI.channels().get(channelName)

      if (!channel) {
        const warnMessage = `Failed to send: "${channelName}" channel not found. please make sure you have a channel named: "${channelName}" in your AsyncAPI file.`
        logWarningMessage(warnMessage, {
          highlightedWords: [channelName],
        })
        return
      }

      const operations = channel.operations().filterBySend()

      if (operations.length === 0) {
        const warnMessage = `Failed to send: No 'send' operation found for channel "${channelName}".`
        logWarningMessage(warnMessage, {
          highlightedWords: [channelName],
        })
        return
      }

      operations.forEach(operation => {
        app.send(
          new GleeMessage({
            operation,
            request: message,
            payload: msg.payload,
            query: msg.query,
            headers: msg.headers,
            channel: channelName,
            serverName: msg.server,
            broadcast: isBroadcast,
          }))
      })
    })
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      const functionsPath = relative(GLEE_DIR, GLEE_FUNCTIONS_DIR)
      const missingFile = relative(GLEE_FUNCTIONS_DIR, `${operation.id()}.js`)
      const missingPath = join(functionsPath, missingFile)
      logWarningMessage(`Missing function file ${missingPath}.`, {
        highlightedWords: [missingPath],
      })
    } else {
      logError(err)
      return
    }
  }
}