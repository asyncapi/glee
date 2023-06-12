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
  console.log("Authentication file on going");
  console.log("headers", headers);

  const auth = headers["authentication"];
  console.log("auth", auth);

  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res1 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res2 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res3 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res4 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res5 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res6 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res7 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  const res8 = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  console.log("network data", res.data);

  return true;
  // glee.send(
  //   new Message({
  //     channel: "/price",
  //     connection,
  //     payload: { error: "" },
  //   })
  // );
}

export const security = "tokens";
