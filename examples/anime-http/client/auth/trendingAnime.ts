/* eslint-disable no-undef */

export async function clientAuth({ parsedAsyncAPI, serverName }) {
    console.log("serverName", serverName)
  
    return {
      token: process.env.TOKEN,
      oauth: {
        implicit: process.env.OAUTH2
      },
      apiKey: process.env.OAUTH2,
      // userPass: {
      //   username: "oviecodes",
      //   password: "megwolo"
      // }
    }
  }