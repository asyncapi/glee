// /* eslint-disable no-undef */

import axios from "axios"

export async function serverAuth({ headers, callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1", {
    timeout: 5000,
  })

  console.log("headers", headers.token)

  // console.log("network data", res.data)

  // callback(false, 401, "Unauthorized");
  //adopt error mechanism for error message
  done(false, 403, "Forbidden")
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
    return {
      token: {
        type: "http",
        value: process.env.TOKEN
      },

      userPass: {
        type: "userPass",
        username: 'ovie',
        password: "somepassword",
        hash: process.env.HASH
      }
    }
}
