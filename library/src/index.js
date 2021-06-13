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

module.exports = async function GleeAppInitializer (config = {}) {
  const directory = process.cwd() // TODO: Make it configurable
  let options = {}
  try {
    options = require(path.resolve(directory, 'glee.config.js'))
    if (typeof options === 'function') options = options()
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      console.error(e)
    }
  }
  const asyncapiFileContent = await readFile(path.resolve(directory, 'asyncapi.yaml'), 'utf-8')
  const parsedAsyncAPI = await asyncapi.parse(asyncapiFileContent)
  const channelNames = parsedAsyncAPI.channelNames()

  const app = new Glee(options)

  registerAdapters(app, parsedAsyncAPI)

  app.use(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(existsInAsyncAPI(parsedAsyncAPI))
  app.use(buffer2string)
  app.use(string2json)
  app.use(logger)
  app.useOutbound(logger)

  channelNames.forEach((channelName) => {
    const channel = parsedAsyncAPI.channel(channelName)
    if (channel.hasPublish()) {
      const operationId = channel.publish().json('operationId')
      if (operationId) {
        const func = require(path.resolve(directory, operationId))
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

  app.use((err, event, next) => {
    console.error('You have received a malformed event. Please review the error below:')
    console.error(err)
  })

  app.useOutbound((err, event, next) => {
    console.error('One of your functions is producing a malformed event. Please review the error below:')
    console.error(err)
  })

  app.on('adapter:connect', (e) => {
    try {
      const afterStart = require(path.resolve(directory, 'lifecycle', 'afterStart.js'))
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
