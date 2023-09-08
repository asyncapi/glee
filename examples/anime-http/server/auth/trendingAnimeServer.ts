// /* eslint-disable no-undef */

// //@ts-ignore
import axios from "axios"

export async function serverAuth({ authProps, done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  console.log("oauth props", authProps.getOauthToken())
  console.log("httpAPIkey", authProps.getHttpAPIKeys("api_key"))
  console.log("token", authProps.getToken())
  console.log("userpassword", authProps.getUserPass())

  done(true)
}

export async function clientAuth({ serverName }) {
  if (serverName === "websockets") {
    return {
      token: process.env.TOKEN,
    }
  }
}
