import { Config } from './index.js'

interface IConfig {
    auth: Function | { string: any }
}

export default class ConfigMqtt extends Config {
    private _config: IConfig

    constructor(config: IConfig) {
        super()
        this._config = config
    }

    async auth({ servername, parsedAsyncAPI }) {
        if (typeof this._config.auth !== 'function') {
            return this._config.auth
        }
        return await this._config.auth({ servername, parsedAsyncAPI })
    }
}