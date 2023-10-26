import { readFile } from 'fs/promises'
import { AsyncAPIDocumentInterface as AsyncAPIDocument, Parser, toAsyncAPIDocument} from '@asyncapi/parser'
import { getConfigs } from './configs.js'
import { logError } from './logger.js'

export async function getParsedAsyncAPI(): Promise<AsyncAPIDocument> {
  const { ASYNCAPI_FILE_PATH } = getConfigs()
  const asyncapiFileContent = await readFile(ASYNCAPI_FILE_PATH, 'utf-8')
  const parser = new Parser()
  const { document, diagnostics } = await parser.parse(asyncapiFileContent)
  if (!document) {
    const errorMessage = 'Failed to parse the AsyncAPI document.'
    logError(new Error(errorMessage))
    console.error(diagnostics)
    process.exit(1)
  }
  return toAsyncAPIDocument(document)
}


export function getChannelNames(parsedAsyncAPI: AsyncAPIDocument) {
  return parsedAsyncAPI.channels().all().map(e => e.id())
}

export function getChannelAddress(parsedAsyncAPI: AsyncAPIDocument, channelName: string) {
  return parsedAsyncAPI.channels().get(channelName).address()
}