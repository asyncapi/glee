/* eslint-disable security/detect-object-injection */
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import ws from 'ws'
import { clientAuthConfig } from '../../lib/userAuth.js'
import GleeAuth from '../../lib/wsHttpAuth.js'
import { applyAddressParameters } from '../../lib/util.js'
import Debug from 'debug'
const debug = Debug("glee:ws:client")
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

    debug("connecting to ", this.serverName)
    for (const channelName of channelsOnThisServer) {
      let headers = {}
      const authConfig = await clientAuthConfig(this.serverName)
      const gleeAuth = new GleeAuth(
        this.AsyncAPIServer,
        this.parsedAsyncAPI,
        this.serverName,
        authConfig
      )

      const protocol = this.AsyncAPIServer.protocol()
      const serverHost = this.AsyncAPIServer.host()
      const channel = this.parsedAsyncAPI.channels().get(channelName)
      const channelAddress = applyAddressParameters(channel)
      let url = new URL(`${protocol}://${serverHost}${channelAddress}`)
      if (authConfig) {
        const modedAuth = await gleeAuth.processClientAuth({ url, headers, query: {} })
        headers = modedAuth.headers
        url = modedAuth.url
      }
      this.clients.push({
        channel: channelName,
        client: new ws(url, { headers }),
        binding: this.parsedAsyncAPI.channels().get(channelName).bindings().get('ws'),
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

      client.on('error', (err: any) => {
        const errMessage = `Error: Authentication function not found at location auth/${this.serverName}. Expected function 'clientAuth'`
        this.emit('error', new Error(errMessage))
        console.error(err)
      })
    }
    return this
  }

  private getWsChannels() {
    const channels = []
    for (const channel of this.channelNames) {
      if (this.parsedAsyncAPI.channels().get(channel).servers().all().length !== 0) { // NOSONAR
        if (
          this.parsedAsyncAPI
            .channels().get(channel)
            .servers().get(this.serverName)
        ) {
          channels.push(channel)
        }
      } else {
        channels.push(channel)
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
