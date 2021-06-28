import 'localenv'
import { readFile, mkdir, writeFile } from 'fs/promises'
import path from 'path'
import asyncapi from '@asyncapi/parser'
import Glee from './lib/glee.js'
import { logWelcome, logLineWithIcon, logWarningMessage } from './lib/logger.js'
import registerAdapters from './registerAdapters.js'
import { register as registerLifecycleEvents, run as runLifecycleEvents } from './lib/lifecycleEvents.js'
import buffer2string from './middlewares/buffer2string.js'
import string2json from './middlewares/string2json.js'
import json2string from './middlewares/json2string.js'
import validate from './middlewares/validate.js'
import existsInAsyncAPI from './middlewares/existsInAsyncAPI.js'
import logger from './middlewares/logger.js'
import errorLogger from './middlewares/errorLogger.js'
import validateConnection from './middlewares/validateConnection.js'
import { JavaGenerator, FormatHelpers } from '@asyncapi/modelina';

export default async function GleeAppInitializer (config = {}) {
  if (!process.env.GLEE_SERVER_NAMES) {
    throw new Error(`Missing "GLEE_SERVER_NAMES" environment variable.`)
  }

  const GLEE_DIR = config.dir || process.cwd()
  const GLEE_CONFIG_DIR = path.resolve(GLEE_DIR, 'glee.config.js');
  const { default: userConfig } = await import(GLEE_CONFIG_DIR);
  config = {...config, ...await userConfig()};
  const GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.lifecycleDir || 'lifecycle')
  const GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  const GLEE_MODEL_DIR = path.resolve(GLEE_DIR, config.modelDir || 'models')
  const GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  const ASYNCAPI_FILE_PATH = path.resolve(GLEE_DIR, 'asyncapi.yaml')

  logWelcome({
    dev: process.env.NODE_ENV === 'development',
    servers: process.env.GLEE_SERVER_NAMES.split(','),
    dir: GLEE_DIR,
    functionsDir: GLEE_FUNCTIONS_DIR,
  })
  
  try {
    let { default: cfg } = await import(GLEE_CONFIG_FILE_PATH)
    if (typeof cfg === 'function') cfg = await cfg()
    config = {
      ...config,
      ...cfg,
    }
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') {
      return console.error(e)
    }
  }

  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  const parsedAsyncAPI = await asyncapi.parse(asyncapiFileContent)


  //Generate all relevant java models
  if(config.language === 'java') {
    await mkdir(GLEE_MODEL_DIR, { recursive: true });
    const javaModelGenerator = new JavaGenerator();
    const models = await javaModelGenerator.generate(parsedAsyncAPI);
    for (const outputModel of models) {
      const outputFilePath = path.resolve(GLEE_MODEL_DIR, `./application/${FormatHelpers.toPascalCase(outputModel.model.$id || 'undefined')}.java`);
      const outputContent = `
package glee.models.application;
${outputModel.dependencies.join('\n')}
${outputModel.result}
  `;
      await writeFile(outputFilePath, outputContent);
    }
  
    //GleeRuntimeModels
    const runtimeAsyncAPIFile = path.resolve('../../GleeRuntime.json');
    console.log(runtimeAsyncAPIFile);
    const runtimeAsyncapiFileContent = await readFile(runtimeAsyncAPIFile, 'utf-8');
    const runtimeParsedAsyncAPI = await asyncapi.parse(runtimeAsyncapiFileContent);
    const runtimeSchemas = [...runtimeParsedAsyncAPI.allSchemas().values()].map((element) => {return element._json;});
    for (const schema of runtimeSchemas) {
      const runtimeModels = await javaModelGenerator.generate(schema);
      for (const outputModel of runtimeModels) {
        const outputFilePath = path.resolve(GLEE_MODEL_DIR, `./runtime/${FormatHelpers.toPascalCase(outputModel.model.$id || 'undefined')}.java`);
        const outputContent = `
package glee.models.runtime;
${outputModel.dependencies.join('\n')}
${outputModel.result}
    `;
        await writeFile(outputFilePath, outputContent);
      }
    }
  }

  //Done with setup

  await registerLifecycleEvents(GLEE_LIFECYCLE_DIR)


  const channelNames = parsedAsyncAPI.channelNames()

  const app = new Glee(config)

  registerAdapters(app, parsedAsyncAPI, config)

  app.use(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(existsInAsyncAPI(parsedAsyncAPI))
  app.useOutbound(validateConnection)
  app.use(buffer2string)
  app.use(string2json)
  app.use(logger)
  app.useOutbound(logger)
  app.use(errorLogger)
  app.useOutbound(errorLogger);


  channelNames.forEach((channelName) => {
    const channel = parsedAsyncAPI.channel(channelName)
    if (channel.hasPublish()) {
      const operationId = channel.publish().json('operationId')
      if (operationId) {
        const filePath = path.resolve(GLEE_DIR, GLEE_FUNCTIONS_DIR, operationId)
        import(`${filePath}.js`)
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
          .catch(err => {
            if (err.code === 'ERR_MODULE_NOT_FOUND') {
              const functionsPath = path.relative(GLEE_DIR, GLEE_FUNCTIONS_DIR)
              const missingFile = path.relative(GLEE_FUNCTIONS_DIR, `${filePath}.js`)
              const missingPath = path.join(functionsPath, missingFile)
              logWarningMessage(`Missing function file ${missingPath}.`, {
                highlightedWords: [missingPath],
              })
            } else {
              console.error(err)
            }
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
