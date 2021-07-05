import { fileURLToPath } from 'url'
import path, { basename, dirname } from 'path'
import { v4 } from 'uuid'
import { spawn } from 'child_process'
import { copyFile, rmdir, mkdir } from 'fs/promises'
import Generator from '@asyncapi/generator'
import ipc, { sendMessage } from "../ipc.js"
import { logErrorLine, logInfoMessage } from '../logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const IPC_REQUEST_TIMEOUT = 60000 // 1 minute

export function runJava(operationId, messageId, message) {
  return new Promise((resolve, reject) => {
    const correlationId = v4()

    sendMessage('java', operationId, correlationId, {
      headers: message.headers,
      payload: message.payload,
      channel: message.channel,
      server: message.server,
      messageId,
    })
    .then(() => {
      const timeout = setTimeout(() => {
        reject(new Error(`Could not send IPC message "${operationId}" to Java socket.`))
      }, IPC_REQUEST_TIMEOUT)
      
      ipc.once(correlationId, (res) => {
        clearTimeout(timeout)
        resolve(res)
      })
    })
    .catch((err) => {
      console.error(err)
    })
  })
}

export function generateAndStartServer(asyncapiFilePath, runtime) {
  return new Promise(async (resolve, reject) => {
    const generatedPath = path.resolve(__dirname, '../../../runtimes/java/generated')

    // Remove and re-create the "generated" directory
    // to avoid dangling files.
    try {
      await rmdir(path.resolve(generatedPath), { recursive: true })
      await mkdir(path.resolve(generatedPath))
    } catch (e) { console.error(e) /* We did our best... */ }

    try {
      const generator = new Generator(path.resolve(__dirname, '../../../runtimes/java'), generatedPath, {
        forceWrite: true,
      })

      logInfoMessage('Generating Java IPC server...')
      await generator.generateFromFile(asyncapiFilePath)
      await Promise.all([...runtime.files].map(filePath => (
        copyFile(filePath, path.resolve(generatedPath, 'src/main/java/glee/functions', basename(filePath)))
      )))

      logInfoMessage('Compiling Java IPC server...')
      const maven = spawn('mvn package', ['-l maven.log'], {
        env: process.env,
        cwd: path.resolve(__dirname, '../../../runtimes/java/generated'),
        shell: true,
        stdio: ['ignore', 'ignore', 'inherit'],
      })

      maven.on('close', (code) => {
        if (code !== 0) {
          const mavenLogPath = path.resolve(__dirname, '../../../runtimes/java/generated/maven.log')
          logErrorLine(`There was an error compiling the Java IPC server. Check ${mavenLogPath} for more details.`, {
            highlightedWords: [mavenLogPath],
          })
          reject()
        } else {
          logInfoMessage('Starting Java IPC server...')
          spawn('java -jar target/glee-0.1.0.jar', {
            env: process.env,
            cwd: path.resolve(__dirname, '../../../runtimes/java/generated'),
            shell: true,
            stdio: 'inherit',
          })
          resolve()
        }
      })
    } catch(e) {
      reject(e)
    }
  })
}