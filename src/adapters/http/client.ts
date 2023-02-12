import Adapter from "../../lib/adapter.js";
import GleeMessage from "../../lib/message.js";
import axios from "axios";
class HttpClientAdapter extends Adapter {
  async connect(): Promise<this> {
    return this._connect();
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message);
  }

  async _connect(): Promise<this> {
    return this;
  }
  async _send(message: GleeMessage): Promise<void> {
    const method = message.payload.method; //get post put
    const url = `http://localhost:${message.payload.port}/${message.serverName}`;
    const body = message.payload.body;
    const query = message.payload.query;

    try {
      const response = await axios({
        method,
        url,
        data: body,
        params: query,
      });
      console.log("reponse: ", response.data);
    } catch (err) {
      console.log(err);
    }
  }
}

export default HttpClientAdapter;
