import Adapter from "../../lib/adapter.js"
import GleeMessage from "../../lib/message.js"
class HttpClientAdapter extends Adapter {
  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage): Promise<void> {
    console.log("==send==")
    return this._send(message)
  }

  async _connect(): Promise<this> {
    console.log("==connected==");

    // return new Promise(async (resolve, reject) => {
      // const requestObj = {
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
      // }
      // this._send(requestObj)
      return this
    // });
  }
  async _send(message) {
    console.log("==_send==")
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
    console.log("---message: ",message);
    // this.emit("send", message)
  }
}

export default HttpClientAdapter
