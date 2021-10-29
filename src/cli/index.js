#!/usr/bin/env node

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import nodemon from 'nodemon'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const args = process.argv.splice(2)

const command = args[0]

if (command === 'dev') {
  nodemon({
    script: path.resolve(__dirname, 'start.js'),
    ext: '*',
    watch: [
      '.env',
      '*',
    ],
    env: {
      NODE_ENV: 'development',
    },
    signal: 'SIGINT',
  })

  nodemon.on('quit', process.exit)
} else if (command === 'start') {
  import('./start.js')
} else {
  console.error(`Unknown command "${args[0]}"`)
}
