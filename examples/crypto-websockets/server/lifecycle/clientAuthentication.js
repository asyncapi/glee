// /* eslint-disable no-undef */

// //@ts-ignore
import { Message } from "@asyncapi/glee";
import axios from "axios";

export default async function ({ serverName, headers, callback: done }) {
  console.log("from client Auth");

  console.log(headers);

  // const auth = headers["authentication"];
  // console.log("auth", auth);

  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  console.log("network data", res.data);

  // callback(false, 401, "Unauthorized");
  done(true);
  // glee.send(
  //   new Message({
  //     channel: "/price",
  //     connection,
  //     payload: { error: "" },
  //   })
  // );
}

export const lifecycleEvent = "onAuth";

//specify auth that's being run
export const security = ["tokens"];
