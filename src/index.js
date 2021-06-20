require('localenv')
const { readFile } = require('fs/promises')
const path = require('path')
const asyncapi = require('@asyncapi/parser')
const Glee = require('./lib/glee')
const { logInfoMessage, logLineWithIcon } = require('./lib/logger')
const registerAdapters = require('./registerAdapters')
const buffer2string = require('./middlewares/buffer2string')
const string2json = require('./middlewares/string2json')
const json2string = require('./middlewares/json2string')
const validate = require('./middlewares/validate')
const existsInAsyncAPI = require('./middlewares/existsInAsyncAPI')
const logger = require('./middlewares/logger')
const errorLogger = require('./middlewares/errorLogger')

module.exports = async function GleeAppInitializer (config = {}) {
  const GLEE_DIR = config.dir || process.cwd()
  const GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  const GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  const ASYNCAPI_FILE_PATH = path.resolve(GLEE_DIR, 'asyncapi.yaml')
  
  try {
    let cfg = require(GLEE_CONFIG_FILE_PATH)
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
        const func = require(path.resolve(GLEE_DIR, GLEE_FUNCTIONS_DIR, operationId))
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

  app.on('adapter:connect', (e) => {
    try {
      const afterStart = require(path.resolve(GLEE_DIR, 'lifecycle', 'afterStart.js'))
      const res = afterStart({
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
