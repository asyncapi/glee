import { existsSync } from 'fs'
import path from 'path'

let GLEE_DIR
let GLEE_LIFECYCLE_DIR
let GLEE_FUNCTIONS_DIR
let GLEE_CONFIG_FILE_PATH
let ASYNCAPI_FILE_PATH

export async function setConstants(config) {
  GLEE_DIR = config.dir || process.cwd()
  GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle')
  GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  ASYNCAPI_FILE_PATH = path.resolve(GLEE_DIR, 'asyncapi.yaml')

  if(existsSync(GLEE_CONFIG_FILE_PATH)){
    //Load and overwrite configs from file
    try {
      let { default: projectConfigs } = await import(GLEE_CONFIG_FILE_PATH)
      if (typeof projectConfigs === 'function') projectConfigs = await projectConfigs()
      if(projectConfigs) {
        GLEE_DIR = projectConfigs.GLEE_DIR ? path.parse(projectConfigs.GLEE_DIR) : GLEE_DIR; 
        GLEE_LIFECYCLE_DIR = projectConfigs.GLEE_LIFECYCLE_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_LIFECYCLE_DIR) : GLEE_LIFECYCLE_DIR; 
        GLEE_FUNCTIONS_DIR = projectConfigs.GLEE_FUNCTIONS_DIR ? path.resolve(GLEE_DIR, projectConfigs.GLEE_FUNCTIONS_DIR) : GLEE_FUNCTIONS_DIR; 
        ASYNCAPI_FILE_PATH = projectConfigs.ASYNCAPI_FILE_PATH ? path.resolve(GLEE_DIR, projectConfigs.ASYNCAPI_FILE_PATH) : ASYNCAPI_FILE_PATH;
      }
    } catch (e) {
      if (e.code !== 'ERR_MODULE_NOT_FOUND') {
        return console.error(e)
      }
    }
  }
  
  return getConstants()
}

export function getConstants() {
  return {
    GLEE_DIR,
    GLEE_LIFECYCLE_DIR,
    GLEE_FUNCTIONS_DIR,
    GLEE_CONFIG_FILE_PATH,
    ASYNCAPI_FILE_PATH
  }
}