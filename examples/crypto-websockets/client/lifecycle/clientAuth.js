// /* eslint-disable no-undef */

// //@ts-ignore
// import { Message } from "@asyncapi/glee";

// export default async function ({ glee, connection, server, serverName }) {
//   console.log("connected");
//   const date = new Date();
//   console.log(
//     connection._parsedAsyncAPI._json.channels,
//     connection._parsedAsyncAPI._json.servers
//   );
//   glee.send(
//     new Message({
//       channel: "/price",
//       connection,
//       payload: "{ token: 'ex.grytli.ref' }",
//     })
//   );
// }

// export const lifecycleEvent = "onConnect";
