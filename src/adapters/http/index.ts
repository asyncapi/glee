import Adapter from '../../lib/adapter.js';
import GleeMessage from '../../lib/message.js';
import http from 'http';

class HttpAdapter extends Adapter {
    private res: any

    name(): string {
        return 'HTTP server'
    }

    async connect(): Promise<this> {
        return this._connect();
    }

    async send(message: GleeMessage): Promise<void> {
        console.log('control reached send');
        return this._send(message);
    }

    _connect(): Promise<this> {
        return new Promise((resolve, reject) => {
            const serverUrl = new URL(this.serverUrlExpanded);
            const httpServer = this.glee.options?.websocket?.httpServer || http.createServer();
            const asyncapiServerPort = serverUrl.port || 80;
            const optionsPort = this.glee.options?.websocket?.port;
            const port = optionsPort || asyncapiServerPort;

            httpServer.on('request', (req, res) => {
                this.res = res;
                let { pathname } = new URL(req.url, serverUrl);

                if (pathname.startsWith('/')) {
                    pathname = pathname.substring(1);
                }

                if (!this.parsedAsyncAPI.channel(pathname)) {
                    res.end('HTTP/1.1 404 Not Found\r\n\r\n');
                    const err = new Error(`A client attempted to connect to channel ${pathname} but this channel is not defined in your AsyncAPI file.`)
                    this.emit('error', err)
                    return reject(err)
                }


                this.emit('connect', {
                    name: this.name(),
                    adapter: this,
                    connection: http,
                    channel: pathname
                })

                const msg = this._createMessage(pathname, 'something');
                this.emit('message', msg, http);

            })



            httpServer.listen(port);

            this.emit('server:ready', { name: this.name(), adapter: this });

            resolve(this);
        })
    }

    async _send(message: GleeMessage): Promise<void> {
        this.res.write(message.payload);
        this.res.end();
    }

    _createMessage(eventName: string, payload: any) {
        return new GleeMessage({
            payload,
            channel: eventName
        })
    }
}


export default HttpAdapter;