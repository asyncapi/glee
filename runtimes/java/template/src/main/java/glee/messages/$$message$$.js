import { File } from '@asyncapi/generator-react-sdk'
import { JavaGenerator, JAVA_JACKSON_PRESET } from '@asyncapi/modelina'

export default async function ModelFile({ message }) {
  const name = message.ext('x-parser-message-name')
  const generator = new JavaGenerator({ presets: [JAVA_JACKSON_PRESET] })
  const messageDef = {
    $id: name,
    type: 'object',
    properties: {
      payload: {
        ...{
          $id: `${name}Payload`,
        },
        ...message.payload()?.json(),
      },
      headers: {
        ...{
          $id: `${name}Headers`,
        },
        ...message.headers()?.json(),
      },
      channel: {
        type: 'string',
      },
      server: {
        type: 'string',
      },
      messageId: {
        type: 'string',
      },
      correlationId: {
        type: 'string',
      },
    },
  }
  const generated = await generator.generate(messageDef)

  return generated.map((gen) => {
    return (
      <File name={`${gen.modelName}.java`}>
        package glee.messages;{'\n\n'}

        {gen.dependencies.map(dep => `${dep}\n`)}{'\n'}

        {gen.result}{'\n\n'}
      </File>
    )
  })
}