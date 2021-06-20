import 'localenv'
import { readFile } from 'fs/promises'
import path from 'path'
import asyncapi from '@asyncapi/parser'
import Glee from './lib/glee.js'
import { logWelcome, logLineWithIcon } from './lib/logger.js'
import registerAdapters from './registerAdapters.js'
import buffer2string from './middlewares/buffer2string.js'
import string2json from './middlewares/string2json.js'
import json2string from './middlewares/json2string.js'
import validate from './middlewares/validate.js'
import existsInAsyncAPI from './middlewares/existsInAsyncAPI.js'
import logger from './middlewares/logger.js'
import errorLogger from './middlewares/errorLogger.js'

export default async function GleeAppInitializer (config = {}) {
  if (!process.env.GLEE_SERVER_NAMES) {
    throw new Error(`Missing "GLEE_SERVER_NAMES" environment variable.`)
  }

  const GLEE_DIR = config.dir || process.cwd()
  const GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  const GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  const ASYNCAPI_FILE_PATH = path.resolve(GLEE_DIR, 'asyncapi.yaml')

  let afterStartFn = async () => {}

  try {
    afterStartFn = (await import(path.resolve(GLEE_DIR, 'lifecycle', 'afterStart.js'))).default
  } catch (e) {
    // We did our best...
  }

  logWelcome({
    dev: process.env.NODE_ENV === 'development',
    servers: process.env.GLEE_SERVER_NAMES.split(','),
    dir: GLEE_DIR,
    functionsDir: GLEE_FUNCTIONS_DIR,
  })
  
  try {
    let cfg = await import(GLEE_CONFIG_FILE_PATH)
    if (typeof cfg === 'function') cfg = cfg()
    config = {
      ...config,
      ...cfg,
    }
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      return console.error(e)
    }
  }

  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  const parsedAsyncAPI = await asyncapi.parse(asyncapiFileContent)
  const channelNames = parsedAsyncAPI.channelNames()

  const app = new Glee(config)

  registerAdapters(app, parsedAsyncAPI, config)

  app.use(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(existsInAsyncAPI(parsedAsyncAPI))
  app.use(buffer2string)
  app.use(string2json)
  app.use(logger)
  app.useOutbound(logger)
  app.use(errorLogger)
  app.useOutbound(errorLogger)

  channelNames.forEach((channelName) => {
    const channel = parsedAsyncAPI.channel(channelName)
    if (channel.hasPublish()) {
      const operationId = channel.publish().json('operationId')
      if (operationId) {
        const filePath = path.resolve(GLEE_DIR, GLEE_FUNCTIONS_DIR, operationId)
        import(`${filePath}.js`)
          .catch(console.error)
          .then(({ default: func }) => {
            const schema = channel.publish().message().payload().json()
            app.use(channelName, validate(schema), (event, next) => {
              func(event)
                .then((res) => {
                  if (res && Array.isArray(res.send)) {
                    res.send.forEach((msg) => {
                      app.send(new Glee.Message({
                        payload: msg.payload,
                        headers: msg.headers,
                        channel: msg.channel || event.channel,
                        serverName: msg.server,
                      }))
                    })
                  }

                  if (res && Array.isArray(res.reply)) {
                    res.reply.forEach((msg) => {
                      event.reply({
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
                        channel: msg.channel || event.channel,
                        serverName: msg.server,
                        broadcast: true,
                      }))
                    })
                  }
                })
                .then(next)
                .catch(next)
            })
        })
      }
    }
    if (channel.hasSubscribe()) {
      const schema = channel.subscribe().message().payload().json()
      app.useOutbound(channelName, validate(schema), json2string)
    }
  })

  app.on('adapter:connect', (e) => {
    logLineWithIcon(':zap:', `Connected to server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
    })
  })
  
  app.on('adapter:ready', (e) => {
    logLineWithIcon(':zap:', `Server ${e.serverName} is ready to accept connections.`, {
      highlightedWords: [e.serverName],
    })
  })
  
  app.on('adapter:reconnect', (e) => {
    logLineWithIcon('↪', `Reconnected to server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: 'green',
    })
  })
  
  app.on('adapter:close', (e) => {
    logLineWithIcon('x', `Closed connection with server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: 'red',
      disableEmojis: true,
    })
  })

  app.on('adapter:connect', async (e) => {
    try {
      const res = await afterStartFn({
        serverName: e.serverName,
        server: e.server,
      })
      if (res && Array.isArray(res.send)) {
        res.send.forEach((event) => {
          try {
            app.send(new Glee.Message({
              payload: event.payload,
              headers: event.headers,
              channel: event.channel,
              serverName: event.server,
              connection: e.connection,
            }))
          } catch (e) {
            console.error(`The onStart lifecycle function failed to send an event to channel ${event.channel}.`)
            console.error(e)
          }
        })
      }
    } catch (e) {
      // We did our best...
    }
  })

  app
    .listen()
    .catch(console.error)
}
