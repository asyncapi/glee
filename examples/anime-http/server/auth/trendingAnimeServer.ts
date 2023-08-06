// /* eslint-disable no-undef */

// //@ts-ignore
// import { Message } from "@asyncapi/glee";
import axios from "axios"

export async function serverAuth({ authProps, callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  // console.log("oauth props", (Object.keys(authProps.getOauth2())))
  // console.log("authProps", authProps)
  console.log("httpAPIkey", authProps.getHttpAPIKeys("api_key"))

  // done(false, 401, "Unauthorized");
  done(false)
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  if (serverName === "websockets") {
    return {
      token: process.env.TOKEN,
    }
  }
}
