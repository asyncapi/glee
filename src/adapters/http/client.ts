import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import got from 'got'
import { HttpAuthConfig, HttpAdapterConfig } from '../../lib/index.js'
import http from 'http'
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
      const channelInfo = this.parsedAsyncAPI.channel(channelName)
      const httpChannelBinding = channelInfo.binding('http')
      const channelServers = channelInfo.servers()
      const isChannelServers =
        !channelServers.length || channelServers.includes(message.serverName)
      if (httpChannelBinding && isChannelServers) {
        const method = httpChannelBinding.method
        let url = `${serverUrl}/${channelName}`
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
        // console.log('headers from client adapter', headers)
        console.log(url)

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
            console.log('getting Error')
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
