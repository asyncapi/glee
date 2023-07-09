// /* eslint-disable no-undef */

import axios from "axios"

export default async function ({ callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1")
  done(true, 401, "unauthorized")
}

export const lifecycleEvent = "onAuth"

//specify auth that's being run
export const security = ["tokens"]
