/* eslint-disable no-undef */

//@ts-ignore
import { Message } from "@asyncapi/glee";

// export default async function ({ glee, connection }) {
//   console.log("authentication function is running");
//   //   throw Error("cannot proceed");
// }

export default (schema) => (event, next) => {
  console.log("authentication function is running");
  //   next(new Error("Testing errors"));
  next();
};

export const security = "tokens";

export const channels = ["/price"];
export const servers = ["websocket"];
