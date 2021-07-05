import { fileURLToPath } from 'url'
import path, { dirname, extname } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { runJS } from './js.js'
import { generateAndStartServer, runJava } from './java.js'
import { logError } from '../logger.js'
import { functions } from '../functions.js'
import Glee from '../glee.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function triggerFunction({
  app,
  operationId,
  messageId,
  message
}) {
  const funcDef = functions[operationId]

  let res
  
  if (funcDef.runtime === 'js') {
    res = await runJS(operationId, messageId, message)
  } else if (funcDef.runtime === 'java') {
    res = await runJava(operationId, messageId, message)
  } else {
    throw new Error(`Couldn't find a suitable runtime for "${funcDef.runtime}" files.`)
  }

  if (!res) return

  if (Array.isArray(res.send)) {
    res.send.forEach((msg) => {
      app.send(new Glee.Message({
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
      app.send(new Glee.Message({
        payload: msg.payload,
        headers: msg.headers,
        channel: msg.channel || message.channel,
        serverName: msg.server,
        broadcast: true,
      }))
    })
  }
}

export async function startRuntimeServers(dir, asyncapiFilePath) {
  try {
    const files = await walkdir.async(dir, { return_object: true })
    const runtimes = {}

    await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        const extension = extname(filePath).substr(1)
        if (extension !== 'js') {
          const dirStats = await stat(path.resolve(__dirname, '../../../runtimes', extension))
          if (!dirStats.isDirectory()) return
        }
        
        runtimes[extension] = runtimes[extension] || {}
        runtimes[extension].files = runtimes[extension].files || new Set()
        runtimes[extension].files.add(filePath)
      } catch (e) {
        logError(e)
      }
    }))

    await Promise.all(Object.keys(runtimes).map((runtime) => {
      if (runtime === 'java') {
        return generateAndStartServer(asyncapiFilePath, runtimes[runtime])
      }
    }))
  } catch (e) {
    console.error(e)
  }
}