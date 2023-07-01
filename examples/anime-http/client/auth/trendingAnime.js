/* eslint-disable no-undef */

// @ts-ignore

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  console.log("serverName", serverName)

  return {
    token: process.env.TOKEN,
  }
}
