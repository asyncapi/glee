import { initializeConfigs } from "./lib/configs.js"
import { getParsedAsyncAPI } from "./lib/asyncapiFile.js"
import generateDocs from "./lib/docs.js"

export default async () => {
  const config = await initializeConfigs()
  const parsedAsyncAPI = await getParsedAsyncAPI()
  await generateDocs(parsedAsyncAPI, config, null)
}
