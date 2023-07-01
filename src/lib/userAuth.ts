// //file for user authentication similar to lifecycle events
// //reads the file
// //parses the file

// *****process to making an auth file - server part*****
//register authname
//name of authfile should be same with the server
//i.e in auth directory we have auth/serverNme.js. we can get protocol from the filename and the security it implements

// ****** on the client part****
//check the security scheme and - send it's auth parameters - access to server's security scheme
//

//in case of multiple server authentication
//client auth should specify what auth to run
// if more than one auth, then array should contain more than one - run in order as specified in array

//how will it work??
//server and client in the same file.
//- if we use serverName as

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

interface FunctionInfo {
  run: GleeFunction;
  clientAuth?: GleeFunction;
  serverAuth?: GleeFunction;
}

const { GLEE_DIR, GLEE_FUNCTIONS_DIR, GLEE_AUTH_DIR } = getConfigs()
export const functions: Map<string, FunctionInfo> = new Map()

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
    console.log("register Auth", files)
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const functionName = basename(filePath, extname(filePath))
          const {
            default: fn,
            clientAuth,
            serverAuth,
          } = await import(pathToFileURL(filePath).href)
          functions.set(functionName, {
            run: fn,
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
    // console.log("auth params", {
    //   ...params.doc,
    //   serverName: params.serverName,
    // })

    // console.log("Auth functions", functions)

    // console.log("glee", params.glee)

    const auth = functions.get(serverName)

    if (!auth === undefined) {
      // new Error("server Auth not found")
      callback(false, 422, "Cannot find authentication file")
    }

    await auth.serverAuth(params)

    // console.log("done with auth file");
    // if (res === undefined) res = null;
    // const { humanReadableError, errors, isValid } = validateData(
    //   res,
    //   FunctionReturnSchema
    // )

    // if (!isValid) {
    //   const err = new GleeError({
    //     humanReadableError,
    //     errors,
    //   })
    //   err.message = `Function ${params.serverName} returned invalid data.`

    //   logError(err, {
    //     highlightedWords: [params.serverName],
    //   })

    return
    // }
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

//example
// **auth/websocket.js - auth/{{serverName}}.js

//serverName is the name of the server from the spec file(asyncApi.yaml)

// for accepting/handling connections from other servers
// export default function ServerAuth({ headers, callback }) {
//   // **logic
// }

// //for connecting to external servers
// export const clientAuth = ({ serverName, parsedAsyncAPI }) => {
//   // should have conditionals about the servers it wants to connect to as in the glee.config.ts file.
//   const username = "";
//   const password = "";
// };
