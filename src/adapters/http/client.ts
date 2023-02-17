import Adapter from "../../lib/adapter.js"
import GleeMessage from "../../lib/message.js"
import axios from "axios"
import { HttpAdapterConfig } from "../../lib/index.js"
class HttpClientAdapter extends Adapter {
  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message)
  }

  async _connect(): Promise<this> {
    const headers = {}
    const config: HttpAdapterConfig = await this.resolveProtocolConfig("http")
    const clientConfig = config?.client
    headers["Authenticaton"] = clientConfig?.authentication?.token
    return this
  }
  async _send(message: GleeMessage): Promise<void> {
    const method = message.payload.method //get post put
    const url = `http://localhost:${message.payload.port}/${message.serverName}`
    const body = message.payload.body
    const query = message.payload.query

    try {
      await axios({
        method,
        url,
        data: body,
        params: query,
      })
    } catch (err) {
      this.emit("error", err)
    }
  }
}

export default HttpClientAdapter
