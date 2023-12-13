import path from 'path'
import { logInfoMessage, logError } from './logger.js'
import Generator from '@asyncapi/generator'
import { getAsyncAPIFileContent } from './asyncapiFile.js'

export const generateDocs = async (config) => {
  if (!isDocsGenerationEnabled(config)) return

  const asyncAPIFileContent = await getAsyncAPIFileContent()
  logInfoMessage('Generating docs for your parsed specification...')

  const generator = createGenerator(config)

  try {
    await generator.generateFromString(asyncAPIFileContent)
    logInfoMessage('Successfully generated docs')
  } catch (error) {
    logError(error)
    return error
  }
}

const isDocsGenerationEnabled = (config) => {
  return config.docs?.enabled !== false
}

const createGenerator = (config) => {
  const template = config.docs?.template || '@asyncapi/markdown-template'
  const outputDir = path.resolve('./', config.docs?.folder || 'docs')

  return new Generator(template, outputDir, { forceWrite: true })
}