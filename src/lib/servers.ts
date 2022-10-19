import { getParsedAsyncAPI } from './asyncapiFile.js'

export async function getSelectedServerNames(): Promise<string[]> {
  const parsedAsyncAPI = await getParsedAsyncAPI()
  
  if (!process.env.GLEE_SERVER_NAMES) {
    return parsedAsyncAPI.serverNames()
  }

  const arrayOfNames = process.env.GLEE_SERVER_NAMES.split(',')
  return parsedAsyncAPI.serverNames().filter(name => {
    return arrayOfNames.includes(name)
  })
}
