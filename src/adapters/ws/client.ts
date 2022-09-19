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
                const { queryValues, headerValues } = wsBindings
                const { query, headers } = this.getBindingValues(queryValues, headerValues)

                for (const key of Object.keys(query)) {
                    url.searchParams.append(key, query[`${key}`])
                }

                this.clients.push({
                    channel,
                    client: new ws(url, { headers }),
                    binding: this.parsedAsyncAPI.channel(channel).binding('ws')
                })
            }

            for (const { client, channel } of this.clients) {
                client.on('open', () => {
                    this.emit('connect', { name: this.name(), adapter: this, connection: client, channels: this.channelNames })
                    resolve(this)
                })

                client.on('message', (data) => {
                    const msg = this._createMessage(channel, data)
                    this.emit('message', msg, client)
                })

                client.on('error', (err) => {
                    this.emit('error', err)
                })

            }

        })
    }

    private getWsChannels() {
        const channels = []
        for (const channel of this.channelNames) {
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

    private getBindingValues(queryValues: any, headerValues: any) {
        const query = {}
        const headers = {}

        if (queryValues) {
            for (const key of Object.keys(queryValues)) {
                let keyString = queryValues[`${key}`]
                const envKeys = keyString.match(/\$(\w+)/gm)
                for (const envKey of envKeys) {
                    keyString = keyString.replace(envKey, process.env[`${envKey.slice(1)}`])
                }
                query[`${key}`] = keyString
            }
        }

        if (headerValues) {
            for (const key of Object.keys(headerValues)) {
                let keyString = headerValues[`${key}`]
                const envkeys = keyString.match(/\$(\w+)/gm)
                for (const envKey of envkeys) {
                    keyString = keyString.replace(envKey, process.env[`${envKey.slice(1)}`])
                }

                headers[`${key}`] = keyString
            }
        }

        return { query, headers }
    }

    async _send(message: GleeMessage): Promise<void> {
        return new Promise((resolve) => {
            const client = this.clients.find(cl => cl.channel === message.channel)
            client.client.send(message.payload)
            resolve()
        })
    }

    _createMessage(eventName: string, payload: any): GleeMessage {
        return new GleeMessage({
            payload: payload,
            channel: eventName
        })
    }
}

export default WsClientAdapter