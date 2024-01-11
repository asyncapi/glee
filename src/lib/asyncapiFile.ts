import { readFile } from 'fs/promises'
import { AsyncAPIDocumentInterface as AsyncAPIDocument, Parser, toAsyncAPIDocument } from '@asyncapi/parser'
import { getConfigs } from './configs.js'
import { logError } from './logger.js'

let parsedAsyncAPI: AsyncAPIDocument
let asyncAPIFileContent: string

export async function getAsyncAPIFileContent(): Promise<string> {
  if (asyncAPIFileContent) return asyncAPIFileContent
  const { ASYNCAPI_FILE_PATH } = getConfigs()
  asyncAPIFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  return asyncAPIFileContent
}
export async function getParsedAsyncAPI(): Promise<AsyncAPIDocument> {
  if (parsedAsyncAPI) return parsedAsyncAPI
  const asyncapiFileContent = await getAsyncAPIFileContent()
  const parser = new Parser()
  const { document, diagnostics } = await parser.parse(asyncapiFileContent)
  if (!document) {
    const errorMessage = 'Failed to parse the AsyncAPI document.'
    logError(new Error(errorMessage))
    console.error(diagnostics)
    process.exit(1)
  }
  parsedAsyncAPI = toAsyncAPIDocument(document)
  return parsedAsyncAPI
}


export function getChannelNames(parsedAsyncAPI: AsyncAPIDocument) {
  return parsedAsyncAPI.channels().all().map(e => e.id())
}

export function getChannelAddress(parsedAsyncAPI: AsyncAPIDocument, channelName: string) {
  return parsedAsyncAPI.channels().get(channelName).address()
}