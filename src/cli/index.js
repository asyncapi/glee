#!/usr/bin/env node

import { fileURLToPath } from 'url'
import path, { dirname, resolve } from 'path'
import nodemon from 'nodemon'
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import asyncapi from '@asyncapi/parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const args = process.argv.splice(2)

const command = args[0]
const params = args.splice(1)

if (command === 'dev') {
  nodemon({
    script: path.resolve(__dirname, 'start.js'),
    ext: '*',
    watch: [
      '.env',
    ],
    env: {
      NODE_ENV: 'development',
    },
    signal: 'SIGINT',
  })

  nodemon.on('quit', process.exit)
} else if (command === 'start') {
  import('./start.js')
} else if (command === 'init') {
  scaffoldProject(params[0])
} else {
  console.error(`Unknown command "${args[0]}"`)
}

function scaffoldProject(name) {
  const currentDir = process.cwd()
  const projectPath = name ? resolve(currentDir, name) : currentDir
  const functionsPath = resolve(projectPath, 'functions')
  const asyncapiFilePath = resolve(projectPath, 'asyncapi.yaml')
  const packageJsonPath = resolve(projectPath, 'package.json')
  const gleePackageJson = JSON.parse(readFileSync(resolve(__dirname, '../../package.json')))

  try {
    mkdirSync(projectPath, { recursive: true })
  } catch (e) {
    // We did our best...
  }

  try {
    mkdirSync(functionsPath, { recursive: true })
  } catch (e) {
    // We did our best...
  }

  let asyncapiFileExists = true
  try {
    statSync(asyncapiFilePath)
  } catch (e) {
    asyncapiFileExists = false
  }

  if (asyncapiFileExists) {
    asyncapi.parse(readFileSync(asyncapiFilePath, { encoding: 'utf8' }))
      .then(doc => {
        const functionBody = `export default async function (event) {
  // Your business logic here...
}`
        doc.channelNames().forEach(channelName => {
          const channel = doc.channel(channelName)
          if (channel.hasPublish() && channel.publish().json('operationId')) {
            try {
              writeFileSync(resolve(functionsPath, `${channel.publish().json('operationId')}.js`), functionBody, { mode: 'wx' })
            } catch (e) {
              // We did our best...
            }
          }
        })
      })
      .catch(err => {
        // If document is empty, simply ignore the error.
        if (err.type !== 'https://github.com/asyncapi/parser-js/null-or-falsey-document') {
          console.error(err)
        }
      })
  } else {
    const initialDoc = `asyncapi: 2.1.0
info:
  title: ${name || 'Hello, Glee!'}
  version: 0.1.0
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels: {}
`
    writeFileSync(asyncapiFilePath, initialDoc)
  }

  try {
    writeFileSync(packageJsonPath, JSON.stringify({
      name: name || 'hello-glee',
      version: '0.1.0',
      type: 'module',
      scripts: {
        dev: 'glee dev',
        start: 'glee start'
      },
      dependencies: {
        '@asyncapi/glee': gleePackageJson.version,
      }
    }, null, 2), { mode: 'wx' })
  } catch (e) {
    // We did our best...
  }
}