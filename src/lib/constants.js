import path from 'path'

let GLEE_DIR
let GLEE_LIFECYCLE_DIR
let GLEE_FUNCTIONS_DIR
let GLEE_CONFIG_FILE_PATH
let ASYNCAPI_FILE_PATH

export function setConstants(config) {
  GLEE_DIR = config.dir || process.cwd()
  GLEE_LIFECYCLE_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'lifecycle')
  GLEE_FUNCTIONS_DIR = path.resolve(GLEE_DIR, config.functionsDir || 'functions')
  GLEE_CONFIG_FILE_PATH = path.resolve(GLEE_DIR, 'glee.config.js')
  ASYNCAPI_FILE_PATH = path.resolve(GLEE_DIR, 'asyncapi.yaml')

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