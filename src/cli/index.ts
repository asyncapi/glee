#!/usr/bin/env node

import { compileAndWatch } from '../lib/compiler.js'
import spawn from 'cross-spawn'
import { logLineWithIcon, logTypeScriptMessage } from '../lib/logger.js'
import { initializeConfigs } from '../lib/configs.js'
import { getParsedAsyncAPI } from '../lib/asyncapiFile.js'
import generateDocs from '../middlewares/generateDocs.js'

const args = process.argv.splice(2)
const command = args[0]
let devChildProcess

if (command === 'dev') {
  const projectDir = process.cwd()
  compileAndWatch({
    projectDir,
    onStart() {
      logTypeScriptMessage('Compiling TypeScript sources...')
    },
    onFileChanged() {
      logLineWithIcon(
        '⟳ ',
        'File change detected. Starting incremental compilation...'
      )
    },
    onCompilationFailed(message) {
      killDevChildProcess()
      logTypeScriptMessage(message)
    },
    onCompilationDone() {
      killDevChildProcess()
      devChildProcess = spawn(
        'node',
        ['./node_modules/@asyncapi/glee/dist/cli/start.js'],
        {
          stdio: 'inherit',
          env: {
            ...process.env,
            NODE_ENV: 'development',
          },
        }
      )
    },
  })
} else if (command === 'start') {
  import('./start.js')
} else if (command === 'docs') {
  (async () => {
    const config = await initializeConfigs()
    const parsedAsyncAPI = await getParsedAsyncAPI()
    generateDocs(parsedAsyncAPI, config, null)
  })()
} else {
  console.error(`Unknown command '${args[0]}'`)
}

function killDevChildProcess() {
  if (devChildProcess) {
    devChildProcess.kill('SIGINT')
  }
}
