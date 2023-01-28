import Adapter from "../../lib/adapter.js";

const axios = require('axios');

class HttpClientAdapter extends Adapter {

  async connect(){
    return this._connect()
  }
  private async _connect(){
    try{
      const config = await this.resolveProtocolConfig('http')
      const endpoint = config?.endpoint;
      const url = new URL(
        this.AsyncAPIServer.url() + endpoint
      )
      const res = await axios.get(url);
      return res.data;
    }
    catch(err){
      throw new Error(
        "Error while fetching data"
      )
   }
  }

}

export default HttpClientAdapter;
