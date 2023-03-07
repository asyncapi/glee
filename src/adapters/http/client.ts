import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import got from 'got'
import { HttpAuthConfig, HttpAdapterConfig } from '../../lib/index.js'
import http from 'http'
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
    const headers = {}
    const config: HttpAdapterConfig = await this.resolveProtocolConfig('http')
    const auth: HttpAuthConfig = await this.getAuthConfig(config.client.auth)
    headers['Authentication'] = auth?.token
    const serverUrl = this.serverUrlExpanded
    this.channelNames.forEach(async (channelName) => {
      const channelInfo = this.parsedAsyncAPI.channel(channelName)
      const httpChannelBinding = channelInfo.binding('http')
      const channelServers = channelInfo.servers()
      const isChannelServers = !channelServers.length || channelServers.includes(message.serverName)
      if (
        httpChannelBinding && isChannelServers
      ) {
        const method = httpChannelBinding.method
        const url = `${serverUrl}/${channelName}`
        const { body , query }:any = message.payload

        got({
          method,
          url,
          json: body,
          searchParams: query,
        })
          .then((res) => {
            const msg = this.createMessage(channelName, res.body)
            this.emit('message', msg, http)
          })
          .catch((err) => {
            this.emit('error', err)
          })
      }
    })
  }
  private createMessage(channelName: string, payload: any) {
    return new GleeMessage({
      payload: JSON.parse(JSON.stringify(payload)),
      channel: channelName,
    })
  }
}

export default HttpClientAdapter
