import { accessSync, statSync, constants } from 'fs'
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

let errorMessage: string 
export async function initializeConfigs(config: Config = {}): Promise<{ [key: string]: string }> {
  GLEE_PROJECT_DIR = process.cwd()
  GLEE_DIR = path.resolve(GLEE_PROJECT_DIR, '.glee')
  GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle')
  GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  ASYNCAPI_FILE_PATH = findSpecFile(GLEE_PROJECT_DIR)
  const configsFromFile = await loadConfigsFromFile()

  if(!ASYNCAPI_FILE_PATH){
    logErrorLine(errorMessage)
    process.exit(1)
  }
  return {
    ...configsFromFile,
    ...getConfigs()
  }
}
function isFileReadable(filePath: string){
  try {
    accessSync(filePath,constants.R_OK)
    return statSync(filePath).isFile()
  } catch (err){

    return false
  }
}
/**
 * Loads the configuration from glee project.
 */
async function loadConfigsFromFile() {
  if (!isFileReadable(GLEE_CONFIG_FILE_PATH)) return 
  try {
    let { default: projectConfigs } = await import(pathToFileURL(GLEE_CONFIG_FILE_PATH).href)
    if (typeof projectConfigs === 'function') projectConfigs = await projectConfigs()
    if (!projectConfigs) return

    GLEE_DIR = projectConfigs.glee?.gleeDir || GLEE_DIR 
    GLEE_LIFECYCLE_DIR = projectConfigs.glee?.lifecycleDir ?? GLEE_LIFECYCLE_DIR 
    GLEE_FUNCTIONS_DIR = projectConfigs.glee?.functionsDir ?? GLEE_FUNCTIONS_DIR 
    ASYNCAPI_FILE_PATH = projectConfigs.glee?.asyncapiFilePath ?? ASYNCAPI_FILE_PATH
    return projectConfigs
  } catch (e) {
    return console.error(e)
  }
}

export function findSpecFile(baseDir: string): string{
  const files = ['asyncapi.yaml', 'asyncapi.json', 'asyncapi.yml']
  const foundFiles = files.filter(file => isFileReadable(path.resolve(baseDir, file)))
  
  if (foundFiles.length === 1) {
    return path.resolve(baseDir, foundFiles[0])
  }  else if(foundFiles.length > 1) {
    errorMessage = "Multiple AsyncAPI files found. Please choose one in you config file (https://github.com/asyncapi/glee/blob/master/docs/config-file.md)."
  } else {
    errorMessage = "Unable fo find the AsyncAPI file. Please make sure it's in your project's directory or set its path in the config file(https://github.com/asyncapi/glee/blob/master/docs/config-file.md)."
  }
  return undefined
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
