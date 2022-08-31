/**
 * WS client adapter
 */
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import ws from 'ws'

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

    private _connect(): Promise<this> {
        return new Promise((resolve) => {

            const channelOnThisServer = this.getWsChannels()

            for (const channel of channelOnThisServer) {
                const wsBindings = this.parsedAsyncAPI.channel(channel).binding('ws')
                const url = new URL(this.AsyncAPIServer.url() + channel)
                if (wsBindings.query) {
                    for (const key of Object.keys(wsBindings.query)) {
                        url.searchParams.append(key, wsBindings.query[`${key}`])
                    }
                }
                this.clients.push({
                    channel,
                    client: new ws(url, wsBindings.headers),
                    binding: this.parsedAsyncAPI.channel(channel).binding('ws')
                })
            }

            for (const {client, channel} of this.clients) {
                client.on('open', () => {
                    this.emit('connect', {name: this.name(), adapter: this, connection: client, channels: this.channelNames})
                    resolve(this)
                })

                client.on('message', (data) => {
                    const msg = this._createMessage(channel, data)
                    this.emit('message', msg, client)
                })

            }

        })
    }

    private getWsChannels() {
        const channels = []
        for(const channel of this.channelNames) {
            if (this.parsedAsyncAPI.channel(channel).hasBinding('ws')) {
                if (this.parsedAsyncAPI.channel(channel).hasServers()) {
                    if (this.parsedAsyncAPI.channel(channel).servers().includes(this.serverName)) {
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
        return new Promise((resolve) => {
            const client = this.clients.find(cl => cl.channel === message.channel)
            client.client.send(message.payload)
            resolve()
        })
    }

    _createMessage(eventName:string , payload: any): GleeMessage {
        return new GleeMessage({
            payload: payload,
            channel: eventName
        })
    }
}

export default WsClientAdapter