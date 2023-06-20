// /* eslint-disable no-undef */

// //@ts-ignore
import { Message } from "@asyncapi/glee";
import axios from "axios";

export default async function ({ serverName, headers, callback: done }) {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  console.log("network data", res.data);

  // callback(false, 401, "Unauthorized");
  //   console.log(typeof done);
  done(true);
}

export const lifecycleEvent = "onAuth";

//specify auth that's being run
export const security = ["tokens"];
