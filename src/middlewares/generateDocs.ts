import path from 'path'
import { logInfoMessage, logLineWithIcon } from '../lib/logger.js'
import Generator from '@asyncapi/generator'


export default async (spec, config) => {
  logInfoMessage(`Generating docs for your parsed specification...`)
  const configData  = config.generator
  const resolvedData = spec._json
  const generator = new Generator(
    configData && configData.template
      ? `@asyncapi/${configData.template}`
      : '@asyncapi/markdown-template',
    path.resolve("./", configData && configData.folder ? configData.folder : 'docs')
  )
  generator
    .generateFromString(JSON.stringify(resolvedData))
    .then(() => {
      logLineWithIcon(
        ':zap:',
        'Successfully generated docs for your specification'
      )
    })
    .catch((error) => {
      logLineWithIcon(
        'x',
        `Failed to generate docs for your specs due to the following reason: ${error}`,
        {
          iconColor: '#f00',
          disableEmojis: true,
        }
      )
    })
}