/* eslint-disable security/detect-object-injection */
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import ws from 'ws'
import { clientAuthConfig } from '../../lib/userAuth.js'
import GleeAuth from '../../lib/wsHttpAuth.js'

interface Client {
  channel: string
  client: ws
  binding?: any
}

class WsClientAdapter extends Adapter {
  private clients: Array<Client> = []

  name(): string {
    return 'WS adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage) {
    return this._send(message)
  }

  private async _connect(): Promise<this> {
    const channelsOnThisServer = this.getWsChannels()

    for (const channel of channelsOnThisServer) {
      let headers = {}
      const authConfig = await clientAuthConfig(this.serverName)
      const gleeAuth = new GleeAuth(
        this.AsyncAPIServer,
        this.parsedAsyncAPI,
        this.serverName,
        authConfig
      )
      let url = new URL(this.AsyncAPIServer.url() + channel)
      if (authConfig) {
        const modedAuth = await gleeAuth.processClientAuth(url, headers, {})
        headers = modedAuth.headers
        url = modedAuth.url
      }
      this.clients.push({
        channel,
        client: new ws(url, { headers }),
        binding: this.parsedAsyncAPI.channel(channel).binding('ws'),
      })
    }

    for (const { client, channel } of this.clients) {
      client.on('open', () => {
        this.emit('connect', {
          name: this.name(),
          adapter: this,
          connection: client,
          channels: this.channelNames,
        })
      })

      client.on('message', (data) => {
        const msg = this._createMessage(channel, data)
        this.emit('message', msg, client)
      })

      client.on('error', (err) => {
        console.log('GETING ERROR')
        this.emit('error', err)
      })
    }
    return this
  }

  private getWsChannels() {
    const channels = []
    for (const channel of this.channelNames) {
      if (this.parsedAsyncAPI.channel(channel).hasBinding('ws')) {
        if (this.parsedAsyncAPI.channel(channel).hasServers()) {
          if (
            this.parsedAsyncAPI
              .channel(channel)
              .servers()
              .includes(this.serverName)
          ) {
            channels.push(channel)
          }
        } else {
          channels.push(channel)
        }
      }
    }

    return channels
  }

  async _send(message: GleeMessage): Promise<void> {
    const client = this.clients.find(
      (cl) => cl.channel === message.channel
    )?.client
    if (client) {
      client.send(message.payload)
    } else {
      throw new Error(
        'There is no WebSocker connection to send the message yet.'
      )
    }
  }

  _createMessage(eventName: string, payload: any): GleeMessage {
    return new GleeMessage({
      payload: payload,
      channel: eventName,
    })
  }
}

export default WsClientAdapter
