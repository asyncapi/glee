# Configuring Glee

Glee comes with sensible defaults so you don't have to worry about configuration. However, sometimes you may want change the behavior or customize Glee in different ways. For that purpose, you can use the `glee.config.js` file.

## The configuration file

Glee's config file is a JavaScript file that exports an async function. Something like this:

```js
export default async function () {
  // More stuff here...
}
```

This function must return an object with protocol specific configuration which would look like this: 


```js
export default async function () {
  return {
    websocket: {},
    mqtt: {},
    cluster: {}
  }
}

```

Here is an example of the `glee.config.js` file for refence: 
```js
export default async function () {
  return {
    websocket: {
      server: {
        httpServer: customServer, // A custom HTTP server of your own.
        adapter: "native", // Default. Can also be 'socket.io' or a reference to a custom adapter.
        port: process.env.PORT,
      },
      client: {
        authentication: {
          http: () => {
            const token = process.env.TOKEN
            return token
          }
        }
      }
    },
    cluster: {
      adapter: "redis",
      name: "cluster", // Default. Name of your cluster.
      url: "redis://localhost:6379", // Server URL used by adapter for clustering
    },
    mqtt: {
      authentication: {
        cert: () => fs.readFileSync('./cert')
        clientId: '123',
        userPassword: {
          username: 'user1',
          password: 'pass12'
        }
      }
    }
  };
}
```
Every protocol has different configuration needs so each protocol has unique configurations:

### Websockets
|Field|Description|
|--|--|
|websocket.server|Websocket server specific configuration|
|websocet.client| Websocket client specific configuration|
|wesocket.server.adapter| The Glee adapter to use for the WebSocket server. Defaults to a "native" WebSocket implementation. Other allowed values are `socket.io` (to use the [Socket.IO](https://socket.io/) Glee adapter) or a reference to a custom adapter.|
|websocket.server.httpServer|  A custom HTTP server of your own. E.g., an [Express](https://expressjs.com/en/4x/api.html) server or any object that implements the [http.Server](https://nodejs.org/api/http.html#http_class_http_server) interface.   |
|webocket.server.port| The port to use when binding the WebSocket server. This is useful when your server is behind a proxy and the port exposed for consumption is not the same as the port your application should be bound to. Defaults to the port specified in the selected AsyncAPI server.|
|websocket.client.authentication.http| The http token to send for authentication of glee application.


### Cluster 
|Field|Description|
|--|--|
|cluster.adapter| The Glee cluster adapter to use for communication between instances. Defaults to Redis Pub/Sub ("redis"). Can be a reference to a custom adapter.|
|cluster.name|The name of the cluster. Defaults to "cluster".|
|cluster.url|The url of the server to be used by the adapter. In case of "redis" adapter, it's the url of the Redis server.|

### MQTT

|Field|Description|
|---|---|
|mqtt.authentication| mqtt authentication configuratation|
|mqtt.authentication.cert| Client certificate
|mqtt.authentication.clientId| mqtt client Id for authentication
|mqtt.authentication.userPassword| username and password paramters for authentication|
|mqtt.authentication.userPassword.username| username parameter
|mqtt.authentication.userPassword.password| password parameter