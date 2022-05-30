import path from 'path';
import { logInfoMessage, logLineWithIcon } from '../lib/logger.js'
import Generator from '@asyncapi/generator'
const generator = new Generator('@asyncapi/markdown-template', path.resolve('./', 'docs'))

export default (data) => {
    logInfoMessage(`Generating docs for your parsed specification...`)
    const resolvedData = data._json;
    generator.generateFromString(JSON.stringify(resolvedData)).then(() => {
        logLineWithIcon(':zap:', 'Successfully generated docs for your specification')
    })
        .catch((error) => {
          logLineWithIcon('x', `Failed to generate docs for your specs due to the following reason: ${error}`, {
      iconColor: '#f00',
      disableEmojis: true,
    })
  });
}