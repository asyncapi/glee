/* eslint-disable no-undef */

export async function clientAuth({ serverName }) {
    console.log("serverName", serverName)
  
    return {
      token: process.env.TOKEN,
      oauth: process.env.OAUTH2,
      apiKey: process.env.APIKEY,
      userPass: {
        user: process.env.USERNAME,
        password: process.env.PASSWORD
      }
    }
  }