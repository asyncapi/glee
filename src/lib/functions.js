import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import Glee from './glee.js'
import { getConfigs } from './configs.js'
import { logWarningMessage } from './logger.js'
import GleeMessage from './message.js'

const { GLEE_DIR, GLEE_FUNCTIONS_DIR } = getConfigs()
export const functions = {}

export async function register(dir) {
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()) return
  } catch (e) {
    if (e.code === 'ENOENT') return
  }

  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        const functionName = basename(filePath, extname(filePath))
        const { default: fn } = await import(filePath)
        functions[functionName] = {
          run: fn,
        }
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
  messageId,
  message
}) {
  try {
    const res = await functions[operationId].run(message)

    if (Array.isArray(res.send)) {
      res.send.forEach((msg) => {
        app.send(new GleeMessage({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel || message.channel,
          serverName: msg.server,
        }))
      })
    }

    if (res && Array.isArray(res.reply)) {
      res.reply.forEach((msg) => {
        message.reply({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel,
        })
      })
    }

    if (res && Array.isArray(res.broadcast)) {
      res.broadcast.forEach((msg) => {
        app.send(new GleeMessage({
          payload: msg.payload,
          headers: msg.headers,
          channel: msg.channel || message.channel,
          serverName: msg.server,
          broadcast: true,
        }))
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