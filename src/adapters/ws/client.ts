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

            const subscribedChannels = this.getSubscribedChannels()

            for(const channel of subscribedChannels) {
                const url = new URL(this.AsyncAPIServer.url() + channel);
                this.clients.push({
                    channel,
                    client: new ws(url),
                    binding: this.parsedAsyncAPI.channel(channel).binding('ws')
                })
            }

            for (const {client, channel} of this.clients) {
                client.on('open', () => {
                    this.emit('connect', {name: this.name(), adapter: this, connection: client, channels: this.channelNames})
                    resolve(this)
                })

                client.on('message', (data) => {
                    console.log(channel, data);
                    const msg = this._createMessage(channel, data);
                    this.emit('message', msg, client);
                })

            }

        })
    }

    _send(message: GleeMessage): Promise<void> {
        return new Promise((resolve) => {

            message.connection.getRaw().send(message.payload)

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