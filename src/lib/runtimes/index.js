import { fileURLToPath } from 'url'
import path, { dirname, extname } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import retry from 'async-retry'
import { runJS } from './js.js'
import { generateAndStartServer, runJava } from './java.js'
import { logError, logInfoMessage, logWarningMessage } from '../logger.js'
import { functions } from '../functions.js'
import Glee from '../glee.js'
import experimentalFlags from '../experimentalFlags.js'
import { loadConfigsFromFile } from '../configs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const defaultRetryConfig = {
  retries: 10,
  factor: 2,
  minTimeout: 1000,
  maxTimeout: Infinity,
  randomize: true,
}

export async function triggerFunction({
  app,
  operationId,
  messageId,
  message
}) {
  const funcDef = functions[operationId]
  const config = await loadConfigsFromFile()
  const retryConfig = config.retry

  let res
  
  try {
    await retry(async (bail, currentAttempt) => {
      if (currentAttempt > 1) {
        logInfoMessage(`(${currentAttempt-1}/${retryConfig.retries}) Retrying function ${operationId}...`, {
          highlightedWords: [operationId],
        })
      }

      if (funcDef.runtime === 'js') {
        res = await runJS(operationId, messageId, message)
      } else if (experimentalFlags.has('JAVA') && funcDef.runtime === 'java') {
        res = await runJava(operationId, messageId, message)
      } else {
        bail(new Error(`Couldn't find a suitable runtime for "${funcDef.runtime}" files.`))
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
    }, {
      ...defaultRetryConfig,
      ...retryConfig,
      onRetry(err) {
        logError(err)
      }
    })
  } catch (err) {
    logInfoMessage('Giving up retrying...')
    throw err
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