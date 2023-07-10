import { basename, extname, relative, join } from 'path'
import { stat } from 'fs/promises'
import walkdir from 'walkdir'
import { getConfigs } from './configs.js'
import { logWarningMessage } from './logger.js'
import { GleeFunction, GleeFunctionEvent } from './index.js'
import { pathToFileURL } from 'url'

interface AuthFunctionInfo {
  clientAuth?: GleeFunction
  serverAuth?: GleeFunction
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
export async function triggerAuth(params: GleeFunctionEvent) {
  const { serverName, callback } = params

  console.log('running auth')

  try {
    const auth = authFunctions.get(serverName)
    if (!auth) {
      callback(false, 422, 'Cannot find authentication file')
    }
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
  return authFunctions.get(serverName).clientAuth
}
