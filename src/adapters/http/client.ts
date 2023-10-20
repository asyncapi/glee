import got from 'got'
import http from 'http'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import { clientAuthConfig } from '../../lib/userAuth.js'
import GleeAuth from '../../lib/wsHttpAuth.js'

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
    let headers = {}
    const authConfig = await clientAuthConfig(this.serverName)
    const serverUrl = this.serverUrlExpanded
    for (const channelName of this.channelNames) {
      const channelInfo = this.parsedAsyncAPI.channels().get(channelName)
      const httpChannelBinding = channelInfo.bindings().get('http')
      const channelServers = channelInfo.servers().all().map(e => e.id())
      const isChannelServers =
        !channelServers.length || channelServers.includes(message.serverName)
      if (httpChannelBinding && isChannelServers) {
        const method = httpChannelBinding.json().method
        let url = new URL( serverUrl + this.parsedAsyncAPI.channels().get(channelName).address())
        const gleeAuth = new GleeAuth(
          this.AsyncAPIServer,
          this.parsedAsyncAPI,
          this.serverName,
          authConfig
        )
        const body: any = message.payload
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

        got({
          method,
          url,
          json: body,
          searchParams: JSON.parse(JSON.stringify(query)),
          headers,
        })
          .then((res) => {
            const msg = this.createMessage(channelName, res.body)
            this.emit('message', msg, http)
          })
          .catch((err) => {
            this.emit('error', err)
          })
      }
    }
  }
  private createMessage(channelName: string, payload: any) {
    return new GleeMessage({
      payload: JSON.parse(JSON.stringify(payload)),
      channel: channelName,
    })
  }
}

export default HttpClientAdapter
