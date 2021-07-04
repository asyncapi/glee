#!/usr/bin/env node --unhandled-rejections=strict

import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import nodemon from 'nodemon'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const args = process.argv.splice(2)

if (args[0] === 'dev') {
  process.env.NODE_ENV = 'development'
  nodemon({
    script: path.resolve(__dirname, 'start.js'),
    ext: 'js json yml yaml',
    signal: 'SIGINT',
  });

  nodemon.on('start', function () {
    // TODO: log something
  }).on('quit', function () {
    process.exit();
  }).on('restart', function (files) {
    // TODO: log something
  });
} else if (args[0] === 'start') {
  import('./start.js')
} else {
  console.error(`Unknown command ${args[0]}`)
}