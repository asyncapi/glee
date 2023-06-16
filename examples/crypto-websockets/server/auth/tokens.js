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
  // console.log("auth", auth);

  const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  // console.log("network data", res.data);

  return false;
}

export const security = "tokens";
