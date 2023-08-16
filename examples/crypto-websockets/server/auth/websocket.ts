// /* eslint-disable no-undef */

import axios from "axios"

export async function serverAuth({ authProps, done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  console.log("token", authProps.getToken())
  console.log("userpass", authProps.getUserPass())

  // callback(false, 401, "Unauthorized");
  done(false)
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
    return {
      token: process.env.TOKEN,
      username: 'ovie',
      password: "somepassword",
    }
}
