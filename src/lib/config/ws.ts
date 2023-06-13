import {Config} from './index.js'

interface IConfig {
    server: {
        httpServer: any, // A custom HTTP server of your own.
        adapter: string, // Default. Can also be 'socket.io' or a reference to a custom adapter.
        port: number
    }
    client: {
        auth: Function | {string: any}
    }
}

export default class ConfigWs extends Config {
    constructor(private _config: IConfig){ 
        super()
    }

    get server() {
        return new ServerConfig(this._config.server)
    }

    get client(){
        return new ClientConfig(this._config.client)
    }
    
}


class ServerConfig extends Config {

    constructor(private _config: {
        httpServer: any
        adapter: string
        port: number
    }){
        super()
    }

    get httpServer() {
        return this._config.httpServer
    }

    adapter(){
        return this.resolve(this._config.adapter)
    }

    protected resolve(ob: any): Promise<any> {
        return this.resolve(this._config.port)
    }
    
}

class ClientConfig extends Config {
    constructor(private _config: {auth: Function | {string: any}}) {
        super()
    }

    async auth({servername, parsedAsyncAPI}) {
        if (typeof this._config.auth !== 'function') {
            return this._config.auth
        }

        return await this._config.auth({servername, parsedAsyncAPI})
    }
}