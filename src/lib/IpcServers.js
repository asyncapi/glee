import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import walkdir from 'walkdir'
import { spawn } from 'child_process'
import { logErrorLine, logInfoMessage } from './logger.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function startIpcServers(dir) {
  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        if (filePath.endsWith('.java')) {
          logInfoMessage('Compiling Java IPC server...')
          const maven = spawn('mvn package', ['-l maven.log'], {
            env: process.env,
            cwd: path.resolve(__dirname, '../../ipc-servers/java'),
            shell: true,
            stdio: ['ignore', 'ignore', 'inherit'],
          })

          maven.on('close', (code) => {
            if (code !== 0) {
              const mavenLogPath = path.resolve(__dirname, '../../ipc-servers/java/maven.log')
              logErrorLine(`There was an error compiling the Java IPC server. Check ${mavenLogPath} for more details.`, {
                highlightedWords: [mavenLogPath],
              })
            } else {
              logInfoMessage('Starting Java IPC server...')
              spawn('java -jar target/ipcserver-0.1.0.jar', {
                env: process.env,
                cwd: path.resolve(__dirname, '../../ipc-servers/java'),
                shell: true,
                stdio: 'inherit',
              })
            }
          })
        }
      } catch (e) {
        console.error(e)
      }
    }))
  } catch (e) {
    console.error(e)
  }
}
