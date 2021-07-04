import { File } from '@asyncapi/generator-react-sdk'
import { JavaGenerator, JAVA_JACKSON_PRESET } from '@asyncapi/modelina'

export default async function ModelFile({ message }) {
  const name = message.ext('x-parser-message-name')
  const generator = new JavaGenerator({ presets: [JAVA_JACKSON_PRESET] })
  const messageDef = {
    ...{
      $id: name,
    },
    ...message.payload().json()
  }
  const generated = await generator.generate(messageDef)

  return (
    <File name={`${name}.java`}>
      package glee.models;{'\n\n'}

      {generated[0].dependencies.map(dep => `${dep}\n`)}{'\n'}

      {generated[0].result}
    </File>
  )
}