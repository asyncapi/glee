import { AsyncAPIDocument } from "@asyncapi/parser";
import { MiddlewareCallback } from "./index.js";
import GleeMessage from "../lib/message.js";

export default (asyncapi: AsyncAPIDocument, configs) =>
  async (event: GleeMessage, next: MiddlewareCallback) => {
    // const servers = asyncapi.servers();

    //event.channel is the current channel that an event occurs
    //event.server

    //if server has security, proceed
    //form a map of the server along with it's security schemes
    const componentNames = asyncapi.components();
    // console.log("security schemes", componentNames.securitySchemes());
    // console.log("servers", servers, typeof servers);

    if (Object.keys(componentNames.securitySchemes()).length == 0)
      return next();

    if (componentNames.securitySchemes()) {
      console.log("Authentication should happen here", event.channel);

      const responses = await configs.runAuth("tokens", {
        glee: configs.app,
        serverName: event.serverName,
        connection: event.connection,
      });

      console.log("response set", responses);

      //   configs.app.use(response[0](event, next));
      for (let auth of responses) {
        // configs.app.useOutbound(auth(event, next));
        await configs.app.useOutbound(auth);
        // auth(event, next);
        // console.log(auth.toString());
      }
      //   return responses;
      //check if channel matches, then
      //call user authentication function from file
      //   return next(
      //     new Error(`Channel ${event.channel} is not accessible, AuthError`)
      //   );
    }
    return next();
  };

// const authMiddleware = async function () {
//   console.log("authentication will happen here");
// };

// console.log("security schemes", componentNames.securitySchemes());

// console.log("all components", componentNames);

// function that returns a function - () => () => {};
