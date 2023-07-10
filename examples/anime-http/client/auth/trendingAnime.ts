/* eslint-disable no-undef */

export async function clientAuth({ parsedAsyncAPI, serverName }) {
    console.log("serverName", serverName)
  
    return {
      token: process.env.TOKEN,
    }
  }