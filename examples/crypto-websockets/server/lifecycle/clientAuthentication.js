/* eslint-disable no-undef */

//@ts-ignore
import { Message } from "@asyncapi/glee";
import axios from "axios";

export default async function ({
  glee,
  connection,
  server,
  serverName,
  headers,
}) {
  console.log("Authentication on going");

  const auth = headers["authentication"];
  console.log("auth", auth);

  // const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  // console.log("network data", res.data);

  return;
  // glee.send(
  //   new Message({
  //     channel: "/price",
  //     connection,
  //     payload: { error: "" },
  //   })
  // );
}

export const lifecycleEvent = "onAuth";
