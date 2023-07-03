import { basename, extname, relative, join } from "path"
import { stat } from "fs/promises"
import walkdir from "walkdir"
import { getConfigs } from "./configs.js"
import { logWarningMessage, logError } from "./logger.js"
// import GleeMessage from "./message.js"
import { GleeFunction, GleeFunctionEvent } from "./index.js"
// import Glee from "./glee.js"
// import {
//   gleeMessageToFunctionEvent,
//   validateData,
//   isRemoteServer,
// } from "./util.js"
import { pathToFileURL } from "url"
// import GleeError from "../errors/glee-error.js"
// import { getParsedAsyncAPI } from "./asyncapiFile.js"

interface AuthFunctionInfo {
  // run: GleeFunction;
  clientAuth?: GleeFunction;
  serverAuth?: GleeFunction;
}

const { GLEE_DIR, GLEE_AUTH_DIR } = getConfigs()
export const functions: Map<string, AuthFunctionInfo> = new Map()

export async function register(dir: string) {
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()) return
  } catch (e) {
    if (e.code === "ENOENT") return
    throw e
  }

  //get serverAuth and ClientAuth

  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const functionName = basename(filePath, extname(filePath))
          const {
            // default: fn,
            clientAuth,
            serverAuth,
          } = await import(pathToFileURL(filePath).href)
          functions.set(functionName, {
            // run: fn,
            clientAuth,
            serverAuth,
          })
        } catch (e) {
          console.error(e)
        }
      })
    )
  } catch (e) {
    console.error(e)
  }
}

export async function triggerAuth(params: GleeFunctionEvent) {
  const { serverName, callback } = params

  try {
    const auth = functions.get(serverName)

    if (!auth) {
      // new Error("server Auth not found")
      callback(false, 422, "Cannot find authentication file")
    }

    await auth.serverAuth(params)

    return
  } catch (err) {
    if (err.code === "ERR_MODULE_NOT_FOUND") {
      const functionsPath = relative(GLEE_DIR, GLEE_AUTH_DIR)
      const missingFile = relative(GLEE_AUTH_DIR, `${serverName}.js`)
      const missingPath = join(functionsPath, missingFile)
      logWarningMessage(`Missing function file ${missingPath}.`, {
        highlightedWords: [missingPath],
      })
    } else {
      throw err
    }
  }
}

export async function clientAuthConfig(serverName: string) {
  return functions.get(serverName).clientAuth
}
