import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage, logError } from './logger.js'
import GleeMessage from './message.js'
import { GleeFunction, GleeFunctionReturn } from './index.js'
import Glee from './glee.js'
import {
  gleeMessageToFunctionEvent,
  validateData,
  isRemoteServer,
  extractExpressionValueFromMessage,
} from './util.js'
import { pathToFileURL } from 'url'
import GleeError from '../errors/glee-error.js'
import { getParsedAsyncAPI } from './asyncapiFile.js'
import Debug from 'debug'
import { AsyncAPIDocumentInterface, OperationInterface } from '@asyncapi/parser'
const debug = Debug('glee:functions')

interface FunctionInfo {
  run: GleeFunction
}

const FunctionReturnSchema = {
  type: 'object',
  properties: {
    payload: {},
    headers: {
      type: 'object',
      propertyNames: { type: 'string' },
      additionalProperties: { type: 'string' },
    },
    query: { type: 'object' },
  },
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
      throw Error(errMsg)
    }
    const functionResult = await operationFunction.run(gleeMessageToFunctionEvent(message, app))
    const replyMessage = createReply(functionResult, message, parsedAsyncAPI)
    if (!replyMessage) return
    const replyChannel = parsedAsyncAPI.channels().get(replyMessage.channel)
    replyChannel.servers().forEach((server) => {
      replyMessage.serverName = server.id()
      app.send(
        replyMessage
      )
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

function createReply(functionResult: void | GleeFunctionReturn, message: GleeMessage, parsedAsyncAPI: AsyncAPIDocumentInterface): GleeMessage {
  const operation = message.operation
  const reply = operation.reply()
  if (!functionResult && !reply) {
    return
  }
  if (!functionResult && reply) {
    const warningMsg = `Operation ${operation.id()} needs to return a response. please make sure your function returns the approprait reply.`
    logWarningMessage(warningMsg)
    return
  }
  if (functionResult && !reply) {
    const warningMsg = `Operation ${operation.id()} doesn't have a reply field. the return result from your function will be ignored.`
    logWarningMessage(warningMsg)
    return
  }
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
  const localServerProtocols = ['ws', 'wss', 'http', 'https']
  const serverProtocol = parsedAsyncAPI.servers().get(message.serverName).protocol().toLocaleLowerCase()
  const isBroadcast = localServerProtocols.includes(serverProtocol) &&
    !isRemoteServer(parsedAsyncAPI, message.serverName)

  let replyChannel = parsedAsyncAPI.channels().all().filter((c) => c.address() === reply.channel().address())[0]
  const replyAddress = reply.address()
  if (replyAddress) {
    const channelAddress = extractExpressionValueFromMessage(this, replyAddress.location())
    if (!channelAddress) {
      throw Error(`cannot parse the ${replyAddress.location()} from your message.`)
    }
    const channel = parsedAsyncAPI.allChannels().filter((c) => c.address === channelAddress)[0]
    if (!channel) {
      throw Error(`cannot find a channel with the address of "${channelAddress}" in your AsyncAPI file.`)
    }
    replyChannel = channel
  }

  return new GleeMessage({ ...functionResult, channel: replyChannel.id(), request: message, broadcast: isBroadcast });


}
