/**
 * WS client adapter
 */
import Adapter from '../../lib/adapter.js';
import GleeMessage from '../../lib/message.js';
import ws from 'ws';


class WsClientAdapter extends Adapter {
    private client: ws

    name(): string {
        return 'WS adapter';
    }

    async connect(): Promise<this> {
        return this._connect();
    }

    async send(message: GleeMessage) {
        return this._send(message);
    }

    _connect(): Promise<this> {
        return new Promise((resolve) => {

            const subscribeChannel = this.getSubscribedChannels();
            const serverBinding = this.AsyncAPIServer.binding('ws');
            const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
                const secName = Object.keys(sec.json())[0]
                return this.parsedAsyncAPI.components().securityScheme(secName)
            })

            /**
             * We do not spin up a server and just create a ws client 
             * to connect to a existing ws server. 
             */
            const url = new URL(this.AsyncAPIServer.url());
            this.client = new ws(url);

            this.client.on('open', () => {
                this.emit('connect', {name: this.name(), adapter: this, connection: this.client, channels: this.channelNames});

            })


            this.client.on('message', (data) => {
                /**
                 * For POC I used hard coded chanel name,
                 * we need to dynamically figure this out. 
                 */
                const msg = this._createMessage('testClient', data);
                this.emit('message', msg, this.client);
            })

            resolve(this);
        })
    }

    _send(message: GleeMessage): Promise<void> {
        return new Promise((resolve) => {

            message.connection.getRaw().send(message.payload);

            resolve();
        })
    }

    _createMessage(eventName:string , payload: any): GleeMessage {
        return new GleeMessage({
            payload: payload,
            channel: eventName
        })
    }
}

export default WsClientAdapter;