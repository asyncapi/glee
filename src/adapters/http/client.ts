import HttpEventEmitter from "../../lib/httpEventEmitter.js"

class HttpClientAdapter extends HttpEventEmitter {
  async connect(): Promise<this> {
    return this._connect()
  }
  async _connect(): Promise<this> {
    // return new Promise(async (resolve, reject) => {
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
      }
      this._send(requestObj);
      return this
    // });
  }
  async _send(message) {
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
    this.emit("send", message)
  }
}

export default HttpClientAdapter
