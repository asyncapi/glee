//file for user authentication similar to lifecycle events
//reads the file
//parses the file

import { stat } from "fs/promises";
import walkdir from "walkdir";
import {
  GleeFunctionEvent,
  GleeFunctionReturn,
  GleeFunctionReturnSend,
} from "./index.js";
import { logInfoMessage } from "./logger.js";
import GleeMessage from "./message.js";
import { arrayHasDuplicates } from "./util.js";
import { pathToFileURL } from "url";

interface IEvent {
  fn: (event: GleeFunctionEvent) => GleeFunctionReturn;
  channels: string[];
  servers: string[];
}
export const events: Map<string, IEvent[]> = new Map();

export async function register(dir: string) {
  try {
    const statsDir = await stat(dir);
    if (!statsDir.isDirectory()) return;
  } catch (e) {
    if (e.code === "ENOENT") return;
  }

  try {
    const files = await walkdir.async(dir, { return_object: true });
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const {
            default: fn,
            // lifecycleEvent,
            security,
            channels,
            servers,
          } = await import(pathToFileURL(filePath).href);

          if (!events.has(security)) events.set(security, []);

          events.set(security, [
            ...events.get(security),
            {
              fn,
              channels,
              servers,
            },
          ]);
        } catch (e) {
          console.error(e);
        }
      })
    );
  } catch (e) {
    console.error(e);
  }
}

export async function run(security: string, params: GleeFunctionEvent) {
  if (!Array.isArray(events.get(security))) return;

  try {
    const connectionChannels = params.connection.channels;
    const connectionServer = params.connection.serverName;

    const handlers = events.get(security).filter((info) => {
      if (
        info.channels &&
        !arrayHasDuplicates([...connectionChannels, ...info.channels])
      ) {
        return false;
      }

      if (info.servers) {
        return info.servers.includes(connectionServer);
      }

      return true;
    });

    if (!handlers.length) return;

    logInfoMessage(`Running ${security} security scheme...`, {
      highlightedWords: [security],
    });

    const responses = await Promise.all(
      handlers.map((info) => info.fn(params))
    );

    return responses;
  } catch (e) {
    console.error(e);
  }
}
