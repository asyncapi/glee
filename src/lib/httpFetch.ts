import { GleeFunctionReturn, GleeFunctionReturnInvoke } from '.'
import got, { Response } from 'got'
import { logError } from './logger.js'

export default async function httFetch(
  { ignoreResponse, ...gotOptions }: GleeFunctionReturnInvoke,
  responseHandler: (res: GleeFunctionReturn, source: string) => void
) {
  console.log('fetching: ', gotOptions.method, ':', gotOptions.url)
  console.log(ignoreResponse, gotOptions)
  let response: Response<string>
  try {
    response = await got(undefined, {
      ...gotOptions,
      retry: {
        limit: 4,
        statusCodes: [429],
        calculateDelay: ({ computedValue }) => {
          console.log('will retry after: ', computedValue)
          return computedValue
        }
      }
    })
    if (!ignoreResponse) {
      const responseJSON: GleeFunctionReturn = JSON.parse(response.body)
      responseHandler(responseJSON, gotOptions.url)
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      responseHandler(response.body as GleeFunctionReturn, gotOptions.url)
    } else logError(err)
  }
}
