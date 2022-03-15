import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage } from './logger.js'
import GleeMessage from './message.js'
import { GleeFunction } from './index.d'
import Glee from './glee.js'
import { gleeMessageToFunctionEvent } from './util.js'
import { pathToFileURL } from 'url'

interface FunctionInfo {
  run: GleeFunction,
}

const { GLEE_DIR, GLEE_FUNCTIONS_DIR } = getConfigs()
export const functions: Map<string, FunctionInfo> = new Map()

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
    return await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        const functionName = basename(filePath, extname(filePath))
        const { default: fn } = await import(pathToFileURL(filePath).href)
        functions.set(functionName, {
          run: fn,
        })
      } catch (e) {
        console.error(e)
      }
    }))
  } catch (e) {
    console.error(e)
  }
}

export async function trigger({
  app,
  operationId,
  message
} : {
  app: Glee,
  operationId: string,
  message: GleeMessage,
}) {
  try {
    const res = await functions.get(operationId).run(gleeMessageToFunctionEvent(message, app))
    let value = res === undefined

    if (res?.send) {
      value = true
      res.send.forEach((msg) => {
        app.send(new GleeMessage({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel || message.channel,
          serverName: msg.server,
          broadcast: true,
        }))
      })
    }

    if (res?.reply) {
      value = true
      res.reply.forEach((msg) => {
        message.reply({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel,
        })
      })
    }

    if ( !value ) {
      logWarningMessage(`Function ${operationId} returned invalid data`, {
        highlightedWords: [operationId]
      })
    }
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
