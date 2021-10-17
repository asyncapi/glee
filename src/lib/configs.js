import { existsSync, constants } from 'fs'
import { access } from 'fs/promises'
import path from 'path'

let GLEE_DIR
let GLEE_LIFECYCLE_DIR
let GLEE_FUNCTIONS_DIR
let GLEE_CONFIG_FILE_PATH
let ASYNCAPI_FILE_PATH

export async function setConfigs(config) {
  GLEE_DIR = config.dir || process.cwd()
  GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle')
  GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  ASYNCAPI_FILE_PATH = resolveAsyncApiPath(GLEE_DIR)
  await loadConfigsFromFile()

  return getConfigs()
}

/**
 * Tries to resolve the path to a valid asyncapi file in the baseDir
 */
export async function resolveAsyncApiPath(baseDir) {
  const asyncApiFiles = ['asyncapi.yaml', 'asyncapi.json', 'asyncapi.yml']

  const promiseArray = asyncApiFiles.map(async (filename) => {
    return access(path.resolve(baseDir, filename), constants.R_OK)
      .then(() => { return path.resolve(baseDir, filename) })
  })

  const fileResults = await Promise.allSettled(promiseArray)
  const accessiblePaths = fileResults.filter((result) => result.status === 'fulfilled')
  if (accessiblePaths.length === 0) { throw new Error('AsyncApi file was not found or is not readable') }
  if (accessiblePaths.length > 1) { throw new Error('Multiple AsyncApi files were found - please remove all but one') }

  return accessiblePaths[0].value
}

/**
 * Loads the configuration from glee project.
 */
async function loadConfigsFromFile() {
  if (!existsSync(GLEE_CONFIG_FILE_PATH)) return
  try {
    let { default: projectConfigs } = await import(GLEE_CONFIG_FILE_PATH)
    if (typeof projectConfigs === 'function') projectConfigs = await projectConfigs()
    if (!projectConfigs) return

    GLEE_DIR = projectConfigs.GLEE_DIR ? path.parse(projectConfigs.GLEE_DIR) : GLEE_DIR
    GLEE_LIFECYCLE_DIR = projectConfigs.GLEE_LIFECYCLE_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_LIFECYCLE_DIR) : GLEE_LIFECYCLE_DIR
    GLEE_FUNCTIONS_DIR = projectConfigs.GLEE_FUNCTIONS_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_FUNCTIONS_DIR) : GLEE_FUNCTIONS_DIR
    ASYNCAPI_FILE_PATH = projectConfigs.ASYNCAPI_FILE_PATH ? path.resolve(GLEE_DIR, projectConfigs.ASYNCAPI_FILE_PATH) : ASYNCAPI_FILE_PATH
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') {
      return console.error(e)
    }
  }
}

export function getConfigs() {
  return {
    GLEE_DIR,
    GLEE_LIFECYCLE_DIR,
    GLEE_FUNCTIONS_DIR,
    GLEE_CONFIG_FILE_PATH,
    ASYNCAPI_FILE_PATH
  }
}