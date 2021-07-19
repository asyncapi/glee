# Lifecycle Events

Glee lets you bind incoming messages to [functions](./functions.md). However, sometimes we need to be proactive and be the first ones to send a message, not necessarily as a reaction to another message. Use cases can be very diverse: from sending a message to announce our client is connected to sending a message every few seconds or minutes.

To subscribe to a lifecycle event, create a file under the `lifecycle` directory. It must have the following shape:

```js
export default async function ({
  glee,
  serverName,
  server,
  connection,
}) {
  // Your business logic here...
}

export const lifecycleEvent = 'onConnect'
```

Each file in the `lifecycle` directory must export a default async function and the `lifecycleEvent` field, which is the [name of the event](#list-of-events) you want to subscribe to. Optionally, your function can return an object following exactly the same syntax [as described in the functions documentation](functions.md).

## List of events

|Event|Description|
|---|---|
|onConnect|A connection with a broker has been established.
|onReconnect|Glee reconnected to a broker.
|onDisconnect|A connection with a broker has been closed.
|onServerReady|Your Glee server is now ready to accept connections.
|onServerConnectionOpen|A client has opened a connection with your Glee server.
|onServerConnectionClose|A client has closed the connection with your Glee server.

All of them take a single argument which contains information about the event:

|Attribute|Description
|---|---|
|glee|A reference to the Glee app.
|serverName|The name of the server where the event happened.
|server|The AsyncAPI definition of the server where the event happened.
|connection|The connection where the event happened.

## Restricting the lifecycle event

In some cases it's useful to restrict the lifecycle event to a specific server or set of servers. To do that, add a line like the following to your lifecycle file:

```js
export const servers = ['mosquitto']
```

The above example makes Glee fire the lifecycle event only if it's coming from the `mosquitto` server.

Additionally, you may want to restrict the lifecycle event by channel/topic. To do that, add a line like the following to your lifecycle file:

```js
export const servers = ['user/signedup']
```

The above example makes Glee fire the lifecycle event only if the connection has the channel `user/signedup` listed as one of its channels.