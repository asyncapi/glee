import path from 'path'
import { logInfoMessage, logLineWithIcon, logError } from '../lib/logger.js'
import Generator from '@asyncapi/generator'

export default async (spec, config, resDir) => {
  logInfoMessage(`Generating docs for your parsed specification...`)
  const configData = config.generator
  const resolvedData = spec._json
  const generator = new Generator(
    configData && configData.template
      ? `@asyncapi/${configData.template}`
      : '@asyncapi/markdown-template',
    path.resolve(
      resDir ? resDir : './',
      configData && configData.folder ? configData.folder : 'docs'
    )
  )
  try {
    await generator.generateFromString(JSON.stringify(resolvedData))
    logLineWithIcon(":zap:", "Successfully generated docs")
    return 'done'
  } catch (error) {
    logError(error)
    return error
  }
}
