import walkdir from 'walkdir'
import Glee from './glee.js'
import { logInfoMessage, logError } from './logger.js'
import { arrayHasDuplicates } from './util.js'
import path from 'path'
import fs from 'fs'
import { gRPCClient, servers as gRPCServers } from '../runtime/client/index.js'

export const events = {}
export async function register (dir) {
  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(Object.keys(files).map(async (filePath) => {
      const ext = path.extname(filePath);
      if(ext === '.js') {
        // JS run as regular
        try {
          const {
            default: fn,
            lifecycleEvent,
            channels,
            servers
          } = await import(filePath)
  
          if (!events[lifecycleEvent]) events[lifecycleEvent] = []
          
          events[lifecycleEvent].push({
            fn,
            channels,
            servers,
          })
        } catch (e) {
          console.error(e)
        }
      } else if (ext === '.java') {
        const lifecycleFilename = path.basename(filePath);
        // If Java use Glee Java runtime
        //Register lifecycle in runtime container
        const response = await gRPCClient.promiseSayGleeRegisterLifecycle(gRPCServers.java, {filename: filePath});
        if(response.errorMessage) {
          logError({message: `Error while trying to compile ${lifecycleFilename}`, details: response });
          process.exit(1)
        }
      }
    }))
  } catch (e) {
    console.error(e)
  }
}

export async function run (lifecycleEvent, params) {
  if (!Array.isArray(events[lifecycleEvent])){
    //Just default to always trigger java runtime lifecycle if it is not locally available 
    const r = await gRPCClient.promiseSayGleeTriggerLifecycle(gRPCServers.java, {
      lifecycle: lifecycleEvent
    });

    logInfoMessage(`Running ${lifecycleEvent} lifecycle Java event...`, {
      highlightedWords: [lifecycleEvent]
    });

    r.send.forEach((event) => {
      try {
        //Hard code here as we have no way of getting the payload from the runtime container
        params.glee.send(new Glee.Message({
          payload: {id: event.payloadStringValue},
          headers: event.headers,
          channel: event.channel,
          serverName: event.server,
          connection: params.connection,
        }))
      } catch (e) {
        console.error(`The ${lifecycleEvent} lifecycle function failed to send an event to channel ${event.channel}.`)
        console.error(e)
      }
    })
  } else {
    try {
      const connectionChannels = params.connection.channels
      const connectionServer = params.connection.serverName
      const handlers = events[lifecycleEvent]
        .filter(info => {
          if (info.channels) {
            if (!arrayHasDuplicates([
              ...connectionChannels,
              ...(info.channels)
            ])) {
              return false
            }
          }
          
          if (info.servers) {
            return info.servers.includes(connectionServer)
          }
  
          return true
        })
  
      if (!handlers.length) return
  
      logInfoMessage(`Running ${lifecycleEvent} lifecycle event...`, {
        highlightedWords: [lifecycleEvent]
      })
      
      const responses = await Promise.all(handlers.map(info => info.fn(params)))
      
      responses.forEach(res => {
        if (res && Array.isArray(res.send)) {
          res.send.forEach((event) => {
            try {
              params.glee.send(new Glee.Message({
                payload: event.payload,
                headers: event.headers,
                channel: event.channel,
                serverName: event.server,
                connection: params.connection,
              }))
            } catch (e) {
              console.error(`The ${lifecycleEvent} lifecycle function failed to send an event to channel ${event.channel}.`)
              console.error(e)
            }
          })
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
  
}