import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage } from './logger.js'
import {
  GleeFunction,
  GleeFunctionEvent,
  GleeAuthFunction,
  GleeAuthFunctionEvent,
} from './index.js'
import { pathToFileURL } from 'url'

interface AuthFunctionInfo {
  clientAuth?: GleeAuthFunction
  serverAuth?: GleeAuthFunction
}

const { GLEE_DIR, GLEE_AUTH_DIR } = getConfigs()
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
  const { serverName, callback } = params

  console.log('running auth')

  try {
    const auth = authFunctions.get(serverName)
    // console.log(auth)
    if (!auth) {
      // throw new Error('Cannot find authentication file')
      logWarningMessage(
        `Missing Authentication function file. Cannot find ${serverName}.ts or ${serverName}.js`,
        {
          highlightedWords: [serverName],
        }
      )
      callback(false, 422, 'Cannot find authentication file')
      return
    }
    await auth.serverAuth(params)
    return
  } catch (err) {
    // console.log('error', err.code)
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
  //should check that it contains the implement security keys e.g tokens, userPass, etc.
  return authFunctions.get(serverName)?.clientAuth
}
