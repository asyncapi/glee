# Configuring Glee

Glee comes with sensible defaults so you don't have to worry about configuration. However, sometimes you may want change the behavior or customize Glee in different ways. For that purpose, you can use the `glee.config.js` file.

## The configuration file

Glee's config file is a JavaScript file that exports an async function. Something like this:

```js
export default async function () {
  // More stuff here...
}
```

This function must return an object with the following shape:

```js
export default async function () {
  return {
    websocket: {
      httpServer: customServer, // A custom HTTP server of your own.
      adapter: 'native', // Default. Can also be 'socket.io' or a reference to a custom adapter.
      port: process.env.PORT,
    }
  }
}
```

|Field|Description|
|---|---|
|adapter|The Glee adapter to use for the WebSocket server. Defaults to a "native" WebSocket implementation. Other allowed values are `socket.io` (to use the [Socket.IO](https://socket.io/) Glee adapter) or a reference to a custom adapter.
|httpServer|A custom HTTP server of your own. E.g., an [Express](https://expressjs.com/en/4x/api.html) server or any object that implements an [http.Server](https://nodejs.org/api/http.html#http_class_http_server) interface.
|port|The port to use when binding the WebSocket server. This is useful when your server is behind a proxy and the port exposed for consumption is not the same as the port your application should be bound to. Defaults to the port specified in the selected AsyncAPI server.
