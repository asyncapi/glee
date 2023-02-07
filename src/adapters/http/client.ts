import HttpEventEmitter from "../../lib/httpEventEmitter";
import GleeMessage from "../../lib/message.js";
import Adapter from "../../lib/adapter.js";

class HttpClientAdapter extends Adapter {
  async connect(): Promise<this> {
    return this._connect();
  }
  _connect(): Promise<this> {
    return new Promise(async (resolve, reject) => {
      const requestObj = {
        method: "POST",
        url: "http://localhost:8081/trendingAnime",
        body: {
          name: "trendingAnime",
          rating: 5,
          studio: "teststudio",
          genre: "testgenre",
        },
        query:{
          name: "trendingAnime",
          rating: "5",
          studio: "teststudio",
          genre: "testgenre",
        }
      };
      this.emit("send", requestObj);
    });
  }
  async _send(message: GleeMessage): Promise<void> {
    //? THE PAYLOAD EXAMPLE
    // const payload = {
    //   method: "POST",
    //   url: "http://localhost:8081/trendingAnime",
    //   body: {
    //     name: "trendingAnime",
    //     rating: 5,
    //     studio: "teststudio",
    //     genre: "testgenre",
    //   },
    //   query:{
    //     name: "trendingAnime",
    //     rating: "5",
    //     studio: "teststudio",
    //     genre: "testgenre",
    //   }
    // };
    this.emit("send", message.payload);
  }
}

export default HttpClientAdapter;
