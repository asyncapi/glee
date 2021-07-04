import { fileURLToPath } from 'url'
import path, { dirname, basename } from 'path'
import { copyFile, rmdir, mkdir } from 'fs/promises'
import walkdir from 'walkdir'
import { spawn } from 'child_process'
import { logError, logErrorLine, logInfoMessage } from './logger.js'
import Generator from '@asyncapi/generator'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function startIpcServers(dir, asyncapiFilePath) {
  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(Object.keys(files).map(async (filePath) => {
      try {
        if (filePath.endsWith('.java')) {
          const generatedPath = path.resolve(__dirname, '../../ipc-servers/java/generated')
          
          // Remove and re-create the "generated" directory
          // to avoid dangling files.
          try {
            await rmdir(path.resolve(generatedPath), { recursive: true })
            await mkdir(path.resolve(generatedPath))
          } catch (e) { console.error(e) /* We did our best... */ }
          
          const generator = new Generator(path.resolve(__dirname, '../../ipc-servers/java'), generatedPath, {
            forceWrite: true,
          })

          logInfoMessage('Generating Java IPC server...')
          await generator.generateFromFile(asyncapiFilePath)
          await copyFile(filePath, path.resolve(generatedPath, 'src/main/java/glee/functions', basename(filePath)))

          logInfoMessage('Compiling Java IPC server...')
          const maven = spawn('mvn package', ['-l maven.log'], {
            env: process.env,
            cwd: path.resolve(__dirname, '../../ipc-servers/java/generated'),
            shell: true,
            stdio: ['ignore', 'ignore', 'inherit'],
          })

          maven.on('close', (code) => {
            if (code !== 0) {
              const mavenLogPath = path.resolve(__dirname, '../../ipc-servers/java/generated/maven.log')
              logErrorLine(`There was an error compiling the Java IPC server. Check ${mavenLogPath} for more details.`, {
                highlightedWords: [mavenLogPath],
              })
            } else {
              logInfoMessage('Starting Java IPC server...')
              spawn('java -jar target/glee-0.1.0.jar', {
                env: process.env,
                cwd: path.resolve(__dirname, '../../ipc-servers/java/generated'),
                shell: true,
                stdio: 'inherit',
              })
            }
          })
        }
      } catch (e) {
        logError(e)
      }
    }))
  } catch (e) {
    console.error(e)
  }
}
