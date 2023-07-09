import { AsyncAPIDocument } from '@asyncapi/parser'
import { MiddlewareCallback } from './index.js'
import GleeMessage from '../lib/message.js'

export default (asyncapi: AsyncAPIDocument, configs) =>
  async (event: GleeMessage, next: MiddlewareCallback) => {
    const componentNames = asyncapi.components()

    if (Object.keys(componentNames.securitySchemes()).length == 0) {
      return next()
    }

    if (componentNames.securitySchemes()) {
      console.log('Authentication should happen here', event.channel)

      const responses = await configs.runAuth('tokens', {
        glee: configs.app,
        serverName: event.serverName,
        connection: event.connection,
      })

      for (const auth of responses) {
        await configs.app.useOutbound(auth)
      }
    }
    return next()
  }
