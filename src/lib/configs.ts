import { existsSync } from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'
import { logErrorLine } from './logger.js'

interface Config {
  functionsDir?: string,
}

let GLEE_DIR: string
let GLEE_PROJECT_DIR: string
let GLEE_LIFECYCLE_DIR: string
let GLEE_FUNCTIONS_DIR: string
let GLEE_CONFIG_FILE_PATH: string
let ASYNCAPI_FILE_PATH: string

export async function initializeConfigs(config: Config = {}): Promise<{ [key: string]: string }> {
  GLEE_PROJECT_DIR = process.cwd()
  GLEE_DIR = path.resolve(GLEE_PROJECT_DIR, '.glee')
  GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle')
  GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  ASYNCAPI_FILE_PATH = findSpecFile(GLEE_PROJECT_DIR)
  const configsFromFile = await loadConfigsFromFile()
  
  return {
    ...configsFromFile,
    ...getConfigs()
  }
}

/**
 * Loads the configuration from glee project.
 */
async function loadConfigsFromFile() {
  if (!existsSync(GLEE_CONFIG_FILE_PATH)) return 
  try {
    let { default: projectConfigs } = await import(pathToFileURL(GLEE_CONFIG_FILE_PATH).href)
    if (typeof projectConfigs === 'function') projectConfigs = await projectConfigs()
    if (!projectConfigs) return

    GLEE_DIR = projectConfigs.GLEE_DIR || GLEE_DIR 
    GLEE_LIFECYCLE_DIR = projectConfigs.GLEE_LIFECYCLE_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_LIFECYCLE_DIR) : GLEE_LIFECYCLE_DIR 
    GLEE_FUNCTIONS_DIR = projectConfigs.GLEE_FUNCTIONS_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_FUNCTIONS_DIR) : GLEE_FUNCTIONS_DIR 
    ASYNCAPI_FILE_PATH = projectConfigs.ASYNCAPI_FILE_PATH ? projectConfigs.ASYNCAPI_FILE_PATH : ASYNCAPI_FILE_PATH
    if(!ASYNCAPI_FILE_PATH){
      logErrorLine("Unable to load the AsyncAPI file. please set its path in your glee config file. ()")
    }
    return projectConfigs
  } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND') {
      return console.error(e)
    }
  }
}

export function findSpecFile(baseDir): string{
  const files = ['asyncapi.yaml', 'asyncapi.json', 'asyncapi.yml']
  const foundFiles = files.filter(file => existsSync(path.resolve(baseDir, file)))
  
  if (foundFiles.length === 1) {
    return path.resolve(baseDir, foundFiles[0])
  }  else {
    return undefined
  }
}
export function getConfigs(): { [key: string]: string } {
  return {
    GLEE_DIR,
    GLEE_PROJECT_DIR,
    GLEE_LIFECYCLE_DIR,
    GLEE_FUNCTIONS_DIR,
    GLEE_CONFIG_FILE_PATH,
    ASYNCAPI_FILE_PATH
  }
}
