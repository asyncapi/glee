import { resolve } from 'path'
import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import Glee from './lib/glee'
import { logWelcome, logLineWithIcon } from './lib/logger'
import experimentalFlags from './lib/experimentalFlags'
import registerAdapters from './registerAdapters'
import { register as registerLifecycleEvents, run as runLifecycleEvents } from './lib/lifecycleEvents'
import { register as registerFunctions, trigger as triggerFunction } from './lib/functions'
import buffer2string from './middlewares/buffer2string'
import string2json from './middlewares/string2json'
import json2string from './middlewares/json2string'
import validate from './middlewares/validate'
import existsInAsyncAPI from './middlewares/existsInAsyncAPI'
import logger from './middlewares/logger'
import errorLogger from './middlewares/errorLogger'
import validateConnection from './middlewares/validateConnection'
import { initializeConfigs } from './lib/configs'
import { getParsedAsyncAPI } from './lib/asyncapiFile'
import { getSelectedServerNames } from './lib/servers'
import { EnrichedEvent } from './lib/adapter'
import { ClusterEvent } from './lib/cluster'

dotenvExpand(dotenv.config())

export default async function GleeAppInitializer () {
  const config = await initializeConfigs()
  const {
    GLEE_DIR,
    GLEE_PROJECT_DIR,
    GLEE_LIFECYCLE_DIR,
    GLEE_FUNCTIONS_DIR,
  } = config

  logWelcome({
    dev: process.env.NODE_ENV === 'development',
    servers: await getSelectedServerNames(),
    dir: GLEE_PROJECT_DIR,
    functionsDir: GLEE_FUNCTIONS_DIR,
    experimentalFlags,
    showAppDir: GLEE_PROJECT_DIR !== process.cwd(),
    showFunctionsDir: GLEE_FUNCTIONS_DIR !== resolve(GLEE_DIR, 'functions'),
  })

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
        app.use(channelName, validate(schema), (event, next) => {
          triggerFunction({
            app,
            operationId,
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

  app.on('adapter:connect', (e: EnrichedEvent) => {
    logLineWithIcon(':zap:', `Connected to server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
    })
    runLifecycleEvents('onConnect', {
      glee: app,
      serverName: e.serverName,
      connection: e.connection,
    })
  })
  
  app.on('adapter:reconnect', (e: EnrichedEvent) => {
    logLineWithIcon('↪', `Reconnected to server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: '#0f0',
    })
    runLifecycleEvents('onReconnect', {
      glee: app,
      serverName: e.serverName,
      connection: e.connection,
    })
  })
  
  app.on('adapter:close', (e: EnrichedEvent) => {
    logLineWithIcon('x', `Closed connection with server ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: '#f00',
      disableEmojis: true,
    })
    runLifecycleEvents('onDisconnect', {
      glee: app,
      serverName: e.serverName,
      connection: e.connection,
    })
  })

  app.on('adapter:server:ready', (e: EnrichedEvent) => {
    logLineWithIcon(':zap:', `Server ${e.serverName} is ready to accept connections.`, {
      highlightedWords: [e.serverName],
    })
    runLifecycleEvents('onServerReady', {
      glee: app,
      serverName: e.serverName,
    })
  })

  app.on('adapter:server:connection:open', (e: EnrichedEvent) => {
    runLifecycleEvents('onServerConnectionOpen', {
      glee: app,
      serverName: e.serverName,
      connection: e.connection,
    })
  })
  
  app.on('adapter:server:connection:close', (e: EnrichedEvent) => {
    runLifecycleEvents('onServerConnectionClose', {
      glee: app,
      serverName: e.serverName,
      connection: e.connection,
    })
  })

  app.on('adapter:cluster:connect', (e: ClusterEvent) => {
    logLineWithIcon(':zap:', `Connected to cluster ${e.serverName}.`, {
      highlightedWords: [e.serverName],
    })
  })

  app.on('adapter:cluster:reconnect', (e: ClusterEvent) => {
    logLineWithIcon('↪', `Reconnected to cluster ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: '#0f0',
    })
  })

  app.on('adapter:cluster:close', (e: ClusterEvent) => {
    logLineWithIcon('x', `Closed connection with cluster ${e.serverName}.`, {
      highlightedWords: [e.serverName],
      iconColor: '#f00',
      disableEmojis: true,
    })
  })

  app
    .listen()
    .catch(console.error)
}
