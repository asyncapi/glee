import {Config} from './index.js'

interface IConfig {
    enabled: boolean
    folder: string
    template: string
}

export default class ConfigDocs extends Config {
    private _config: IConfig
    constructor(config: IConfig) {
        super()
        this._config = config
    }

    get enabled(){
        return this._config.enabled || true
    }

    get folder() {
        return this._config.folder || 'docs'
    }

    get template() {
        return this._config.template || '@asyncapi/markdown-template'
    }
}