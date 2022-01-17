import { readFile } from 'fs/promises'
import asyncapi, { AsyncAPIDocument } from '@asyncapi/parser'
import { getConfigs } from './configs'

export async function getParsedAsyncAPI(): Promise<AsyncAPIDocument> {
  const { ASYNCAPI_FILE_PATH } = getConfigs()
  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  return asyncapi.parse(asyncapiFileContent)
}
