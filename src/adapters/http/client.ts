import got, { Method } from 'got'
import http from 'http'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import { clientAuthConfig } from '../../lib/userAuth.js'
import GleeAuth from '../../lib/wsHttpAuth.js'
import { logWarningMessage } from '../../lib/logger.js'

class HttpClientAdapter extends Adapter {
  name(): string {
    return 'HTTP client'
  }
  async connect(): Promise<this> {
    this.emit('connect', {
      name: this.name(),
      adapter: this,
      connection: http,
      channel: this.channelNames,
    })
    return this
  }

  async send(message: GleeMessage): Promise<void> {
    let headers = message.headers
    const authConfig = await clientAuthConfig(this.serverName)
    const serverUrl = this.serverUrlExpanded
    for (const channelName of this.channelNames) {
      const channelInfo = this.parsedAsyncAPI.channels().get(channelName)
      const httpChannelBinding = channelInfo.bindings().get('http')
      const channelServers = channelInfo.servers().all().map(e => e.id())
      const isChannelServers =
        !channelServers.length || channelServers.includes(message.serverName)
      if (httpChannelBinding && isChannelServers) {
        const method: Method = httpChannelBinding.json().method
        let url = new URL(serverUrl + this.parsedAsyncAPI.channels().get(channelName).address())
        const gleeAuth = new GleeAuth(
          this.AsyncAPIServer,
          this.parsedAsyncAPI,
          this.serverName,
          authConfig
        )
        let body: any = message.payload
        let query: { [key: string]: string } | { [key: string]: string[] } =
          message.query

        if (authConfig) {
          const modedAuth = await gleeAuth.processClientAuth(
            url,
            headers,
            query
          )
          headers = modedAuth.headers
          url = modedAuth.url.href
          query = modedAuth.query
        }
        if (!!body && !this.shouldMethodHaveBody(method)) {
          logWarningMessage(`"${method}" can't have a body. please make sure you are using the correct http method for '${channelName}' channel. ignoring the body...`)
          body = undefined
        }
        console.log("sending the request: ")
        got({
          method,
          url,
          json: body,
          searchParams: !!query ? JSON.parse(JSON.stringify(query)) : undefined,
          headers: headers,
        })
          .then((res) => {
            console.log(message)
            const msg = this.createMessage(message, channelName, res.body)
            this.emit('message', msg, http)
          })
          .catch((err) => {
            console.error(err)
            this.emit('error', err)
          })
      }
    }
  }
  private createMessage(requestMessage: GleeMessage, channelName: string, payload: any) {
    return new GleeMessage({
      request: requestMessage,
      payload: JSON.parse(JSON.stringify(payload)),
      channel: channelName,
    })
  }
  private shouldMethodHaveBody(method: Method) {
    return ["post", "put", "patch"].includes(method.toLocaleLowerCase())
  }
}

export default HttpClientAdapter
