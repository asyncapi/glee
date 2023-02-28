import { GleeFunctionReturn, GleeFunctionReturnInvoke } from './index.js'
import got, { Method, Response } from 'got'
import { logError } from './logger.js'

export default async function httpFetch(
  { ignoreResponse, ...options}: GleeFunctionReturnInvoke,
  responseHandler: (res: GleeFunctionReturn, source: string) => void
) {
  let response: Response<string>
  try {

    //got will not retry on POST by default, since we expect to have lots of POST requests here, changing the default option.
    const retryOnMethods: Method[] = ['GET','POST', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE']
    if(!options.retry?.methods){
      if(!options.retry) options.retry = {methods: retryOnMethods}
      else options.retry.methods = retryOnMethods
    }
    response = await got(undefined, options)
    if (!ignoreResponse) {
      const responseJSON: GleeFunctionReturn = JSON.parse(response.body)
      responseHandler(responseJSON, options.url.toString())
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      responseHandler(response.body as GleeFunctionReturn, options.url.toString())
    } else logError(err)
  }
}
