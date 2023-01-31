import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage } from './logger.js'
import GleeMessage from './message.js'
import { GleeFunction, GleeFunctionReturn } from './index.d'
import Glee from './glee.js'
import {
  generateUrlFunction,
  gleeMessageToFunctionEvent,
  isAValidHttpUrl,
  isRemoteServer,
} from './util.js'
import { pathToFileURL } from 'url'
import { getParsedAsyncAPI } from './asyncapiFile.js'
import httpFetch from './httpFetch.js'
import { validateGleeFunctionReturn, validateGleeInvokeOptions } from './jsonSchemaValidators.js'
import { AsyncAPIDocument } from '@asyncapi/parser'

interface FunctionInfo {
  run: GleeFunction
}

const { GLEE_DIR, GLEE_FUNCTIONS_DIR } = getConfigs()
export const functions: Map<string, FunctionInfo> = new Map()

export function generate(parsedAsyncAPI: AsyncAPIDocument, gleeDir: string) {
  parsedAsyncAPI.channelNames().forEach(async (channelName) => {
    const channel = parsedAsyncAPI.channel(channelName)
    if (!channel.hasPublish()) return
    const operationId = channel.publish().json('operationId')
    if (isAValidHttpUrl(operationId)) {
      const gleeInvokeOptions = channel.publish().json('x-glee-invoke')
      const isValid = validateGleeInvokeOptions(gleeInvokeOptions, operationId)
      if (isValid) {
        generateUrlFunction(gleeDir, operationId, gleeInvokeOptions)
      }
    }
  })
}

export async function register(dir: string) {
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()) return
  } catch (e) {
    if (e.code === 'ENOENT') return
    throw e
  }

  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const functionName = basename(filePath, extname(filePath))
          const { default: fn } = await import(pathToFileURL(filePath).href)
          functions.set(functionName, {
            run: fn,
          })
        } catch (e) {
          console.error(e)
        }
      })
    )
  } catch (e) {
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
    const parsedAsyncAPI = await getParsedAsyncAPI()
    const res = await functions.get(operationId).run(gleeMessageToFunctionEvent(message, app))

    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    const handleResponse = (res: GleeFunctionReturn, source: string) => {
      validateGleeFunctionReturn(res, source)
      res?.send?.forEach((msg) => {
        const localServerProtocols = ['ws', 'wss', 'http', 'https']
        const serverProtocol = parsedAsyncAPI.server(msg.server).protocol().toLowerCase()
        const isBroadcast =
          localServerProtocols.includes(serverProtocol) &&
          !isRemoteServer(parsedAsyncAPI, msg.server)
        app.send(
          new GleeMessage({
            payload: msg.payload,
            headers: msg.headers,
            channel: msg.channel || message.channel,
            serverName: msg.server,
            broadcast: isBroadcast,
          })
        )
      })

      res?.reply?.forEach((msg) => {
        message.reply({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel,
        })
      })
      res?.invoke?.forEach((request) => {
        httpFetch(request, handleResponse)
      })
    }
    handleResponse(res, operationId)
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
