/**
 * WS client adapter
 */
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import ws from 'ws'
import qs from 'qs'

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
                const { queryValues, headerValues } = wsBindings
                const { query, headers } = this.getBindingValues(queryValues, headerValues)

                const url = new URL(this.AsyncAPIServer.url() + channel + '?' + qs.stringify(query))

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

        const injectEnv = (keyString: string) => {
            let resolvedKey = keyString
            const envTokens = resolvedKey.match(/\$(\w+)/gm)
            if (envTokens === null) return resolvedKey
            for (const envToken of envTokens) {
                resolvedKey = resolvedKey.replace(envToken, process.env[`${envToken.slice(1)}`])
            }

            return resolvedKey
        }

        if (queryValues) {
            for (const key of Object.keys(queryValues)) {
                const keyString = queryValues[`${key}`]
                if (Array.isArray(keyString)) {
                    query[`${key}`] = keyString.map(key => injectEnv(key))
                } else {
                    query[`${key}`] = injectEnv(keyString)
                }
            }
        }

        if (headerValues) {
            for (const key of Object.keys(headerValues)) {
                const keyString = headerValues[`${key}`]
                headers[`${key}`] = injectEnv(keyString)
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