import path from 'path'
import { logInfoMessage, logError } from './logger.js'
import Generator from '@asyncapi/generator'

export default async (spec, config, resDir) => {
  const configData = config.docs
  if (configData?.enabled === false) return
  logInfoMessage(`Generating docs for your parsed specification...`)
  const resolvedData = spec.json()
  const generator = new Generator(
    configData?.template ? configData.template : '@asyncapi/markdown-template',
    path.resolve(
      resDir ? resDir : './',
      configData?.folder ? configData.folder : 'docs'
    ),
    { forceWrite: true }
  )
  try {
    await generator.generateFromString(JSON.stringify(resolvedData))
    logInfoMessage('Successfully generated docs')
  } catch (error) {
    logError(error)
    return error
  }
}
