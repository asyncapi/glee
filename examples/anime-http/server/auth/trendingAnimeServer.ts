// /* eslint-disable no-undef */

// //@ts-ignore
// import { Message } from "@asyncapi/glee";
import axios from "axios"

export async function serverAuth({ callback: done }) {
  await axios.get("https://jsonplaceholder.typicode.com/todos/1")

  console.log("running in auth file in auth folder")

  // console.log("network data", res.data)

  // callback(false, 401, "Unauthorized");
  //   console.log(typeof done);
  done(false)
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {}

// export const lifecycleEvent = "onAuth";

// //specify auth that's being run
// export const security = ["tokens"];
