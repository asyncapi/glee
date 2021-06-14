require('localenv')
const { readFile } = require('fs/promises')
const path = require('path')
const asyncapi = require('@asyncapi/parser')
const Glee = require('./lib/glee')
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

  registerAdapters(app, parsedAsyncAPI)

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
                  event.reply(msg.payload, msg.headers, msg.channel)
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
    try {
      const afterStart = require(path.resolve(GLEE_DIR, 'lifecycle', 'afterStart.js'))
      const res = afterStart()
      if (res && Array.isArray(res.send)) {
        res.send.forEach((event) => {
          try {
            app.send(event.payload, event.headers, event.channel, e.connection)
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
    .then((adapters) => {
      adapters.forEach(
        adapter => console.log(`${adapter.name()} initialized.`)
      )
    })
    .catch(console.error)
}
