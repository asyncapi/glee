// /* eslint-disable no-undef */

import axios from "axios"

export async function serverAuth({ authProps, callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  console.log("token", authProps.getToken())
  const token = authProps.getToken()
  // checkDB(token) -> done(false)
  console.log("userpass", authProps.getUserPass())
  console.log("cert", authProps.getCert())

  // console.log("network data", res.data)

  // callback(false, 401, "Unauthorized");
  //adopt error mechanism for error message
  done(true)
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
    return {
      token: process.env.TOKEN,
      username: 'ovie',
      password: "somepassword",
    }
}
