import { fileURLToPath } from 'url'
import path, { dirname, extname } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { runJS } from './js.js'
import { generateAndStartServer, runJava } from './java.js'
import { logError, logInfoMessage, logWarningMessage } from '../logger.js'
import { functions } from '../functions.js'
import Glee from '../glee.js'
import experimentalFlags from '../experimentalFlags.js'

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
  } else if (experimentalFlags.has('JAVA') && funcDef.runtime === 'java') {
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
    let files
    
    try {
      files = await walkdir.async(dir, { return_object: true })
    } catch (e) {
      logInfoMessage('No functions directory found.')
      return
    }

    const runtimes = {}

    await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        const extension = extname(filePath).substr(1)
        if (extension !== 'js') {
          if (extension === 'java' && !experimentalFlags.has('JAVA')) {
            logWarningMessage('Experimental Java support is not enabled. To enable it, set the environment variable GLEE_EXPERIMENTAL_JAVA=on.', {
              highlightedWords: ['GLEE_EXPERIMENTAL_JAVA=on']
            })
            return
          }

          try {
            const dirStats = await stat(path.resolve(__dirname, '../../../runtimes', extension))
            if (!dirStats.isDirectory()) throw new Error()
          } catch (e) {
            logWarningMessage(`Could not find a suitable runtime for .${extension} files.`, {
              highlightedWords: [`.${extension}`]
            })
          }
        }
        runtimes[extension] = runtimes[extension] || {}
        runtimes[extension].files = runtimes[extension].files || new Set()
        runtimes[extension].files.add(filePath)
      } catch (e) {
        logError(e)
      }
    }))

    await Promise.all(Object.keys(runtimes).map((runtime) => {
      if (experimentalFlags.has('JAVA') && runtime === 'java') {
        return generateAndStartServer(asyncapiFilePath, runtimes[runtime])
      }
    }))
  } catch (e) {
    console.error(e)
  }
}