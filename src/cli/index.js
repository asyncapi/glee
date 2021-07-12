#!/usr/bin/env node --unhandled-rejections=strict

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import nodemon from 'nodemon'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const args = process.argv.splice(2)

if (args[0] === 'dev') {
  nodemon({
    script: path.resolve(__dirname, 'start.js'),
    ext: '*',
    watch: [
      '.env.local',
    ],
    env: {
      NODE_ENV: 'development',
    },
    signal: 'SIGINT',
  })

  nodemon.on('quit', process.exit)
} else if (args[0] === 'start') {
  import('./start.js')
} else {
  console.error(`Unknown command "${args[0]}"`)
}