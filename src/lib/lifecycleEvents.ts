import { stat } from "fs/promises"
import walkdir from "walkdir"
import {
  GleeFunctionEvent,
  GleeFunctionReturn,
  GleeFunctionReturnSend,
} from "./index.js"
import { logInfoMessage } from "./logger.js"
import GleeMessage from "./message.js"
import { arrayHasDuplicates } from "./util.js"
import { pathToFileURL } from "url"

interface IEvent {
  fn: (event: GleeFunctionEvent) => GleeFunctionReturn;
  channels: string[];
  servers: string[];
  security: string[];
}
export const events: Map<string, IEvent[]> = new Map()

export async function register(dir: string) {
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()) return
  } catch (e) {
    if (e.code === "ENOENT") return
  }

  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const {
            default: fn,
            lifecycleEvent,
            channels,
            servers,
            security,
          } = await import(pathToFileURL(filePath).href)

          if (!events.has(lifecycleEvent)) events.set(lifecycleEvent, [])

          events.set(lifecycleEvent, [
            ...events.get(lifecycleEvent),
            {
              fn,
              channels,
              servers,
              security,
            },
          ])
        } catch (e) {
          console.error(e)
        }
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export async function run(lifecycleEvent: string, params: GleeFunctionEvent) {
  if (!Array.isArray(events.get(lifecycleEvent))) return

  //try to get the security scheme to run based on the server

  try {
    let connectionChannels, securityNames

    const connectionServer = params.connection?.serverName || params.serverName

    if (lifecycleEvent == "onAuth") {
      securityNames = params.doc
        .security()
        .map((sec) => Object.keys(sec.json())[0])
    } else {
      connectionChannels = params.connection.channels
    }

    //get auth array for serverName
    const handlers = events.get(lifecycleEvent).filter((info) => {
      if (
        info.channels &&
        !arrayHasDuplicates([...connectionChannels, ...info.channels])
      ) {
        return false
      }

      if (info.servers) {
        return info.servers.includes(connectionServer)
      }

      //check if server has that securityScheme
      if (
        info.security &&
        !arrayHasDuplicates([...securityNames, ...info.security])
      ) {
        console.error(
          `The ${lifecycleEvent} lifecycle couldn't find any security for ${connectionServer} authentication.`
        )
        params.callback(false, 422, "Cannot find authentication file")
        return false
      }

      return true
    })

    if (!handlers.length) return

    logInfoMessage(`Running ${lifecycleEvent} lifecycle event...`, {
      highlightedWords: [lifecycleEvent],
    })

    const responses = await Promise.all(
      handlers.map((info) => info.fn(params))
    )

    responses.forEach((res) => {
      res?.send?.forEach((event: GleeFunctionReturnSend) => {
        try {
          params.glee.send(
            new GleeMessage({
              payload: event.payload,
              headers: event.headers,
              channel: event.channel,
              serverName: event.server,
              connection: params.connection,
              query: event.query,
            })
          )
        } catch (e) {
          console.error(
            `The ${lifecycleEvent} lifecycle function failed to send an event to channel ${event.channel}.`
          )
          console.error(e)
        }
      })
    })
  } catch (e) {
    console.error(e)
  }
}
