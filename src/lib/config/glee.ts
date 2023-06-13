import {Config} from './index.js'

interface IConfig {
    lifecycleDir: string
    functionsDir: string
    asyncapiFilePath: string
}

export default class ConfigGlee extends Config {
    private _config: IConfig
    constructor(config: IConfig) {
        super()
        this._config = config
    }

    lifecycleDir() {
        return this.resolve(this._config.lifecycleDir || './lifecycle')
    }

    functionsDir() {
        return this.resolve(this._config.functionsDir || './functions')
    }

    asyncapiFilePath() {
        return this.resolve(this._config.asyncapiFilePath || './asyncapi.json')
    }
}