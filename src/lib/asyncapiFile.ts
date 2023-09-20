import { readFile } from 'fs/promises'
import asyncapi, { AsyncAPIDocumentInterface as AsyncAPIDocument, Parser, toAsyncAPIDocument} from '@asyncapi/parser'
import { getConfigs } from './configs.js'

export async function getParsedAsyncAPI(): Promise<AsyncAPIDocument> {
  const { ASYNCAPI_FILE_PATH } = getConfigs()
  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  const parser = new Parser()
  return toAsyncAPIDocument(parser.parse(asyncapiFileContent))
}
