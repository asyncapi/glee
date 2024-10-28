/* eslint-disable security/detect-object-injection */
import { GleeQuoreAdapter, GleeQuoreMessage } from '@asyncapi/gleequore'
import ws from 'ws'
import GleeQuoreAuth from './wsHttpAuth.js'
import Debug from 'debug'
import { ChannelInterface } from '@asyncapi/parser'
import { substituteParameterInAddress } from './utils.js'
const debug = Debug("glee:ws:client")
interface Client {
  channel: string
  client: ws
  binding?: any
}

class WsClientAdapter extends GleeQuoreAdapter {
  private clients: Array<Client> = []

  name(): string {
    return 'WS adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeQuoreMessage) {
    return this._send(message)
  }

  private async _connect(): Promise<this> {
    const channelsOnThisServer: string[] = this.getWsChannels()

    debug("connecting to ", this.serverName)
    for (const channelName of channelsOnThisServer) {
      let headers = {}
      const authConfig = await this.app.clientAuthConfig(this.serverName)
      const gleeAuth = new GleeQuoreAuth(
        this.AsyncAPIServer,
        this.parsedAsyncAPI,
        this.serverName,
        authConfig
      )

      const protocol = this.AsyncAPIServer.protocol()
      const serverHost = this.AsyncAPIServer.host()
      const channel = this.parsedAsyncAPI.channels().get(channelName)
      if (!channel) continue
      const channelAddress = applyAddressParameters(channel)
      let url = new URL(`${protocol}://${serverHost}${channelAddress}`)
      if (authConfig) {
        const modedAuth = await gleeAuth.processClientAuth({ url, headers, query: {} })
        headers = modedAuth?.headers ? modedAuth.headers : headers
        url = modedAuth?.url ? modedAuth.url : url
      }
      this.clients.push({
        channel: channelName,
        client: new ws(url, { headers }),
        binding: this.parsedAsyncAPI.channels().get(channelName)?.bindings().get('ws'),
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

  private getWsChannels(): string[] {
    const channels: string[] = []
    for (const channel of this.channelNames) {
      if (this.parsedAsyncAPI.channels().get(channel)?.servers().all().length !== 0) { // NOSONAR
        if (
          this.parsedAsyncAPI
            .channels().get(channel)
            ?.servers().get(this.serverName)
        ) {
          channels.push(channel)
        }
      } else if (channel) {
        channels.push(channel)
      }
    }

    return channels
  }

  async _send(message: GleeQuoreMessage): Promise<void> {
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

  _createMessage(eventName: string, payload: any): GleeQuoreMessage {
    return new GleeQuoreMessage({
      payload: payload,
      channel: eventName,
    })
  }
}

function applyAddressParameters(channel: ChannelInterface, message?: GleeQuoreMessage): string | undefined {
  let address = channel.address()
  if (!address) return undefined
  
  for (const parameter of channel.parameters()) {
    address = substituteParameterInAddress(parameter, address, message)
  }
  return address
}

export default WsClientAdapter
