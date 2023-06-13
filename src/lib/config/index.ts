import ConfigDocs from "./docs.js"
import ConfigGee from './glee.js'
import ConfigMqtt from './mqtt.js'
import ConfigWs from './ws.js'

export class Config {
    protected async resolve(ob) {
        if (typeof ob !== 'function') {
            return ob
        }
        return await ob()
    }
}

export default class GleeConfig {
    private _config: any
    
    constructor(config: any) {
        this._config = config
    }

    get docs() {
        return new ConfigDocs(this._config.docs)
    }

    get glee() {
        return new ConfigGee(this._config.glee)
    }

    get mqtt() {
        return new ConfigMqtt(this._config.mqtt)
    }

    get ws() {
        return new ConfigWs(this._config.ws)
    }
}

const config = new GleeConfig({})
