import { readFile } from 'fs/promises'
import asyncapi from '@asyncapi/parser'
import { getConstants } from './constants.js'

export async function getParsedAsyncAPI() {
  const { ASYNCAPI_FILE_PATH } = getConstants()
  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  return asyncapi.parse(asyncapiFileContent)
}