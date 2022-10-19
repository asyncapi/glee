# Functions

Glee relies on functions to execute your business logic. Functions are files that export a default async Node.js function:

```js
/* onHello.js */

export default async function (event) {
  // Your business logic here...
}
```

Functions take a single argument, which is the event received from a broker or a client, depending which kind of API you're building. The `event` argument has the following shape:

|Attribute|Description|
|----|----|
|payload|The payload/body of the received event.
|headers|The headers/metadata of the received event.
|channel|The name of the channel/topic from which the event was read.
|serverName|The name of the server/broker from which the event was received.

Functions may return an object to tell Glee what to do next. For instance, the following example greets the user back:

```js
/* onHello.js */

export default async function (event) {
  return {
    reply: [{
      payload: 'Greetings! How is your day going?'
    }]
  }
}
```

|Attribute|Type|Description|
|---|---|---|
|send|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send when the processing of the inbound event has finished. All clients subscribed to the given channel/topic will receive the message.
|reply|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send as a reply when the processing of the inbound event has finished. This is useful when the target of your message is the sender of the inbound event. Note, however, that this only works when you're running Glee as a server. For example, using `reply` when receiving a WebSocket message is fine and the reply will exclusively go to the client that sent the message. However, if you're receiving a message from an MQTT broker, `reply` will work exactly the same way as `send` above, and will send the message to all the clients subscribed to the given channel/topic.
|broadcast|array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt;|A list of outbound messages to send to all the clients. This is only useful when you're running Glee as a server. For example, using `broadcast` when receiving a WebSocket message is fine and the outbound message will go to all the clients that have an open connection with the server. However, if you're receiving a message from an MQTT broker, `broadcast` will work exactly the same way as `send` above, and will send the message to all the clients subscribed to the given channel/topic.

##### Anatomy of an outbound message

|Attribute|Type|Description|
|---|---|---|
|payload|string|The payload/body of the message you want to send.
|headers|object&lt;string,string&gt;|The headers/metadata of the message you want to send.
|channel|string|The channel/topic you want to send the message to. Defaults to `event.channel`, i.e., the same channel as the received event.
|server|string|The server/broker you want to send the message to. Defaults to `event.serverName`, i.e., the same server as the received event.

## How does Glee know which function it should execute?

Glee reads your `asyncapi.yaml` file and searches for all the `publish` operations containing an `operationId` attribute. The `operationId` serves as a mechanism to bind a given operation to a specific function file. For instance, given the folowing AsyncAPI definition:

```yaml
...
channels:
  hello:
    publish:
      operationId: onHello
      ...
```

Glee maps the `onHello` operation to the `functions/onHello.js` file.