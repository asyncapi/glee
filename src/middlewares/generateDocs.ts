import path from 'path'
import { pathToFileURL } from 'url'
import { logInfoMessage, logLineWithIcon } from '../lib/logger.js'
import Generator from '@asyncapi/generator'

async function readConfig(filePath) {
  const { default: fn } = await import(pathToFileURL(filePath).href)
  const { generator } = await fn()
  return generator
}

export default async (data, filePath) => {
  logInfoMessage(`Generating docs for your parsed specification...`)
  const config = await readConfig(filePath)
  const resolvedData = data._json
  const generator = new Generator(
    config && config.template
      ? `@asyncapi/${config.template}`
      : '@asyncapi/markdown-template',
    path.resolve("./", config && config.folder ? config.folder : 'docs')
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