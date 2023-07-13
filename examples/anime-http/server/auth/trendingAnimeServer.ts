// /* eslint-disable no-undef */

// //@ts-ignore
// import { Message } from "@asyncapi/glee";
import axios from "axios"

export async function serverAuth({ headers, callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  console.log("running in auth file in auth folder")

  console.log("headers", headers["authentication"])

  // console.log("network data", res.data)

  // callback(false, 401, "Unauthorized");
  done(false, 403, "Forbidden")
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  if (serverName === "websockets") {
    return {
      token: process.env.TOKEN,
    }
  }
}
