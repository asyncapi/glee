import path from 'path'
import { logInfoMessage, logError } from './logger.js'
import Generator from '@asyncapi/generator'
import { getAsyncAPIFileContent } from './asyncapiFile.js'

export default async (config) => {
  const DOCS_CONFIG = config.docs
  if (!DOCS_CONFIG?.enabled === false) return
  const asyncAPIFileContent = await getAsyncAPIFileContent()
  logInfoMessage(`Generating docs for your parsed specification...`)
  const generator = new Generator(
    DOCS_CONFIG?.template || '@asyncapi/markdown-template',
    path.resolve('./', DOCS_CONFIG?.folder || 'docs'
    ),
    { forceWrite: true }
  )
  try {
    await generator.generateFromString(asyncAPIFileContent)
    logInfoMessage('Successfully generated docs')
  } catch (error) {
    logError(error)
    return error
  }
}
