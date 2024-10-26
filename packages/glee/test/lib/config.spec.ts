import fs from 'fs'
import path from 'path'
import {
  findSpecFile,
  loadConfigsFromFile,
  initializeConfigs,
  getConfigs,
} from '../../src/lib/configs.js'

const yamlPath = path.resolve('./asyncapi.yaml')
const jsonPath = path.resolve('./asyncapi.json')

const gleePath = './.glee'
const configFile = '/glee.config.js'
const configsPath = path.join(gleePath, configFile)
const [lifecycleDir, functionDir, authDir] = ['./lifecy', './func', './authSec']
// const cwd = process.cwd()

describe('Tests resolving the AsyncAPI file path.', () => {
  afterEach(async () => {
    const promises = [jsonPath, yamlPath].map(async (file) =>
      fs.unlinkSync(file)
    )
    await Promise.allSettled(promises)
  })

  test("Should return undefined if AsyncAPI file doesn't exists.", async () => {
    expect(findSpecFile('')).toBe(undefined)
  })

  test('Should return undefined if there are multiple AsyncAPI spec files.', async () => {
    fs.writeFileSync(jsonPath, '')
    fs.writeFileSync(yamlPath, '')
    expect(findSpecFile('')).toBe(undefined)
  })

  test('Should fails if asyncapi.json is a folder.', async () => {
    fs.mkdirSync(jsonPath)
    expect(findSpecFile('')).toBe(undefined)
    fs.rmdirSync(jsonPath)
  })

  test('Should succeed in finding AsyncAPI spec if there is only one.', async () => {
    fs.writeFileSync(jsonPath, '')
    const resultingPath = findSpecFile('')
    expect(resultingPath).toBe(jsonPath)
  })
})

describe('Test resolving the config file path when no config is initialized', () => {
  beforeEach(async () => {})

  test('getConfigs function should return undefined for configs', () => {
    expect(getConfigs().GLEE_CONFIG_FILE_PATH).toBe(undefined)
    expect(getConfigs().ASYNCAPI_FILE_PATH).toBe(undefined)
  })

  test('getConfigs function should return undefined for config file properties', () => {
    expect(getConfigs().GLEE_LIFECYCLE_DIR).toBeUndefined()
    expect(getConfigs().GLEE_FUNCTIONS_DIR).toBeUndefined()
    expect(getConfigs().GLEE_AUTH_DIR).toBeUndefined()
  })

  test('if no config file is found return undefined', async () => {
    expect(await loadConfigsFromFile()).toBeUndefined()
  })
})

describe('check config features when config is initialized', () => {
  beforeEach(async () => {
    fs.writeFileSync(yamlPath, '')
    const conf = `export default async function () {
          return {
              glee: { // Glee core configurations
                  lifecycleDir: '${lifecycleDir}',
                  functionsDir: '${functionDir}',
                  authDir: '${authDir}'
                }
          }
      }`
    fs.mkdirSync(gleePath)
    fs.writeFileSync(configsPath, conf)
    await initializeConfigs()
  })

  afterEach(async () => {
    const promises = [configsPath, yamlPath].map(async (file) =>
      fs.unlinkSync(file)
    )
    await Promise.allSettled(promises)
    fs.rmSync(gleePath, {
      recursive: true,
      force: true,
    })
  })

  test('loadConfigFromFile should return defined value when there is a config file', async () => {
    expect(await loadConfigsFromFile()).toBeDefined()
  })

  test('Should read config data from the current working directory', () => {
    expect(getConfigs().GLEE_PROJECT_DIR).toBe(process.cwd())
  })

  test('expect glee dir to be /.glee in current working directory', () => {
    expect(getConfigs().GLEE_DIR).toBe(path.join(process.cwd(), gleePath))
  })

  test('GLEE_CONFIG_FILE_PATH should be glee.config.js', () => {
    expect(getConfigs().GLEE_CONFIG_FILE_PATH).toBe(
      path.join(process.cwd(), configsPath)
    )
  })

  test('lifecycle folder should be same as set in config file', () => {
    expect(getConfigs().GLEE_LIFECYCLE_DIR).toBe(
      path.join(process.cwd(), gleePath, lifecycleDir)
    )
  })

  test('function folder should be same as set in config file', () => {
    expect(getConfigs().GLEE_FUNCTIONS_DIR).toBe(
      path.join(process.cwd(), gleePath, functionDir)
    )
  })

  test('Auth folder should be same as set in config file', () => {
    expect(getConfigs().GLEE_AUTH_DIR).toBe(
      path.join(process.cwd(), gleePath, authDir)
    )
  })
})
