import { basename, extname } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { logWarningMessage } from './logger.js'
import { GleeAuthFunction, GleeAuthFunctionEvent } from './index.js'
import { pathToFileURL } from 'url'

interface AuthFunctionInfo {
  clientAuth?: GleeAuthFunction
  serverAuth?: GleeAuthFunction
}

export const authFunctions: Map<string, AuthFunctionInfo> = new Map()

export async function register(dir: string) {
  try {
    const statsDir = await stat(dir)
    if (!statsDir.isDirectory()) return
  } catch (e) {
    if (e.code === 'ENOENT') return
    throw e
  }

  //get serverAuth and ClientAuth
  try {
    const files = await walkdir.async(dir, { return_object: true })
    return await Promise.all(
      Object.keys(files).map(async (filePath) => {
        try {
          const serverName = basename(filePath, extname(filePath))
          const { clientAuth, serverAuth } = await import(
            pathToFileURL(filePath).href
          )
          authFunctions.set(serverName, {
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
export async function triggerAuth(params: GleeAuthFunctionEvent) {
  const { serverName, done } = params

  try {
    const auth = authFunctions.get(serverName)
    if (!auth) {
      logWarningMessage(
        `Missing Authentication function file. Cannot find ${serverName}.ts or ${serverName}.js`,
        {
          highlightedWords: [serverName],
        }
      )
      done(false, 422, 'Cannot find authentication file')
      return
    }
    //run serverAuth function with passed parameters
    await auth.serverAuth(params)
    return
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      logWarningMessage(`Missing function file ${serverName}.`, {
        highlightedWords: [serverName],
      })
    } else {
      throw err
    }
  }
}

export async function clientAuthConfig(serverName: string) {
  //get client credentials
  return authFunctions.get(serverName)?.clientAuth
}
