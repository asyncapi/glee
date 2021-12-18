import { resolve } from 'path'
import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import Glee from './lib/glee.js'
import { logWelcome, logLineWithIcon } from './lib/logger.js'
import experimentalFlags from './lib/experimentalFlags.js'
import registerAdapters from './registerAdapters.js'
import { register as registerLifecycleEvents, run as runLifecycleEvents } from './lib/lifecycleEvents.js'
import { register as registerFunctions } from './lib/functions.js'
import buffer2string from './middlewares/buffer2string.js'
import string2json from './middlewares/string2json.js'
import json2string from './middlewares/json2string.js'
import validate from './middlewares/validate.js'
import existsInAsyncAPI from './middlewares/existsInAsyncAPI.js'
import logger from './middlewares/logger.js'
import errorLogger from './middlewares/errorLogger.js'
import validateConnection from './middlewares/validateConnection.js'
import { startRuntimeServers, triggerFunction } from './lib/runtimes/index.js'
import { setConfigs } from './lib/configs.js'
import { getParsedAsyncAPI } from './lib/asyncapiFile.js'
import { getSelectedServerNames } from './lib/servers.js'

dotenvExpand(dotenv.config())

export default async function GleeAppInitializer (config = {}) {
  const {
    GLEE_DIR,
    GLEE_PROJECT_DIR,
    GLEE_LIFECYCLE_DIR,
    GLEE_FUNCTIONS_DIR,
    ASYNCAPI_FILE_PATH
  } = await setConfigs(config)

  logWelcome({
    dev: process.env.NODE_ENV === 'development',
    servers: await getSelectedServerNames(),
    dir: GLEE_PROJECT_DIR,
    functionsDir: GLEE_FUNCTIONS_DIR,
    experimentalFlags,
    showAppDir: GLEE_PROJECT_DIR !== process.cwd(),
    showFunctionsDir: GLEE_FUNCTIONS_DIR !== resolve(GLEE_DIR, 'functions'),
  })

  await startRuntimeServers(GLEE_FUNCTIONS_DIR, ASYNCAPI_FILE_PATH)
  await registerFunctions(GLEE_FUNCTIONS_DIR)
  await registerLifecycleEvents(GLEE_LIFECYCLE_DIR)

  const parsedAsyncAPI = await getParsedAsyncAPI()
  const channelNames = parsedAsyncAPI.channelNames()

  const app = new Glee(config)

  await registerAdapters(app, parsedAsyncAPI, config)

  app.use(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(validateConnection)
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
        const schema = channel.publish().message().payload().json()
        const messageId = channel.publish().message().ext('x-parser-message-name')
        app.use(channelName, validate(schema), (event, next) => {
          triggerFunction({
            app,
            operationId,
            messageId,
            message: event,
          }).then(next).catch(next)
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
    runLifecycleEvents('onConnect', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
      connection: e.connection,
    })
  })
  
  app.on('adapter:reconnect', (e) => {
    logLineWithIcon('↪', `Reconnected to server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: 'green',
    })
    runLifecycleEvents('onReconnect', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
      connection: e.connection,
    })
  })
  
  app.on('adapter:close', (e) => {
    logLineWithIcon('x', `Closed connection with server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: 'red',
      disableEmojis: true,
    })
    runLifecycleEvents('onDisconnect', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
      connection: e.connection,
    })
  })

  app.on('adapter:server:ready', (e) => {
    logLineWithIcon(':zap:', `Server ${e.serverName} is ready to accept connections.`, {
      highlightedWords: [e.serverName],
    })
    runLifecycleEvents('onServerReady', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
    })
  })

  app.on('adapter:server:connection:open', (e) => {
    runLifecycleEvents('onServerConnectionOpen', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
      connection: e.connection,
    })
  })
  
  app.on('adapter:server:connection:close', (e) => {
    runLifecycleEvents('onServerConnectionClose', {
      glee: app,
      serverName: e.serverName,
      server: e.server,
      connection: e.connection,
    })
  })

  app
    .listen()
    .catch(console.error)
}
