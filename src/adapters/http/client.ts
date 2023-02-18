import Adapter from "../../lib/adapter.js";
import GleeMessage from "../../lib/message.js";
import axios from "axios";
import { HttpAdapterConfig } from "../../lib/index.js";
import http from "http"
class HttpClientAdapter extends Adapter {
  async connect(): Promise<this> {
    return this._connect();
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message);
  }

  async _connect(): Promise<this> {
    const headers = {};
    const config: HttpAdapterConfig = await this.resolveProtocolConfig("http");
    const clientConfig = config?.client;
    headers["Authenticaton"] = clientConfig?.authentication?.token;
    return this;
  }
  async _send(message: GleeMessage): Promise<void> {

    const serverUrl = this.serverUrlExpanded;
    this.channelNames.forEach(async (channelName) => {
      const channelInfo = this.parsedAsyncAPI.channel(channelName);
      const httpChannelBinding = channelInfo.binding("http");
      const servers = channelInfo.servers();
      if (
        httpChannelBinding &&
        (!servers.length || servers.includes(message.serverName))
      ) {
        const method = httpChannelBinding.method; //get post put
        const url = serverUrl + "/" + channelName;
        const body = message.payload.body;
        const query = message.payload.query;

        //todo send message back to a operationId function
        axios({
          method,
          url,
          data: body,
          params: query,
        })
          .then((res) => {
            console.log("getting response: ", res);
            //todo NOT ABLE TO FIGURE OUT 
            this.emit("message",res,http)
          })
          .catch((err) => {
            this.emit("error", err);
          });
      }
    });
  }
}

export default HttpClientAdapter;
