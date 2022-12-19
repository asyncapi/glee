import path from 'path'
import { logInfoMessage, logError } from './logger.js'
import Generator from '@asyncapi/generator'

export default async (spec, config, resDir) => {
  const configData = config.docs
  if (!configData || configData?.enabled) {
    logInfoMessage(`Generating docs for your parsed specification...`)
    const resolvedData = spec.json()
    const generator = new Generator(
      configData && configData.template
        ? configData.template
        : '@asyncapi/markdown-template',
      path.resolve(
        resDir ? resDir : './',
        configData && configData.folder ? configData.folder : 'docs'
      )
    )
    try {
      await generator.generateFromString(JSON.stringify(resolvedData))
      logInfoMessage('Successfully generated docs')
    } catch (error) {
      logError(error)
      return error
    }
  }
}
