import { initializeConfigs } from './lib/configs.js'
import { generateDocs } from './lib/docs.js'

export default async () => {
  const config = await initializeConfigs()
  await generateDocs(config)
}
