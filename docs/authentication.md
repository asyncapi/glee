# Functions

<!-- Glee relies on functions to execute your business logic. Functions are files that export a default async Node.js function: -->

Authentication in Glee can be done using authentication functions. Authentication functions are files that export either one or both of the `clientAuth` and `serverAuth` Node.js functions:

```js
/* websocket.js */

export async function serverAuth({ authProps, callback: done }) {
  //server auth logic
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  //client auth logic
}
```

The name of the file should be the name of the targeted server that the authentication is made for.

The `serverAuth` function takes an argument that can be destructured as follows

| Attribute  | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| callback   | The done function that tells the server to proceed.             |
| authProps  | The authentication parameters recieved from the client.         |
| serverName | The name of the server/broker from which the event was emitted. |
| doc        | The parsedAsyncAPI schema                                       |

The `clientAuth` function also takes an argument, and it's argument can be destructured as follows

| Attribute      | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| parsedAsyncAPI | The parsedAsyncAPI schema.                                                            |
| serverName     | The name of the server/broker from with the authentication parameters are being sent. |

Functions take a single argument, which is the event received from a broker or a client, depending which kind of API you're building. The `event` argument has the following shape:

The `done` parameter in the `serverAuth` function allows the broker/server to know what to do next depending on the boolean value you pass to it.

```js
/* websocket.js */

export async function serverAuth({ authProps, callback: done }) {
  // done(true)
  //done(false, 401, "Unauthorized")
  // done(false)
}
```

When `true` is passed to the done parameter, the server/broker knows to go ahead and allow the client to connect, which means authentication has succeeded. However if the `done` parameter is called with `false` then the server knows to throw an error message and reject the client, which means authenticatio has failed.


#### Client Authentication in Glee



#### Server Authentication in Glee



#### Supported Authentication Values in AsyncAPI.yaml file

AsyncAPI currently supports a variety of authentication formats as specified in the documentation, however Glee supports the following authentication schemas



```yaml


```



Functions may return an object to tell Glee what to do next. For instance, the following example greets the user back:

| Attribute | Type                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| send      | array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt; | A list of outbound messages to send when the processing of the inbound event has finished. All clients subscribed to the given channel/topic will receive the message.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| reply     | array&lt;[OutboundMessage](#anatomy-of-an-outbound-message)&gt; | A list of outbound messages to send as a reply when the processing of the inbound event has finished. This is useful when the target of your message is the sender of the inbound event. Note, however, that this only works when you're running Glee as a server. For example, using `reply` when receiving a WebSocket message is fine and the reply will exclusively go to the client that sent the message. However, if you're receiving a message from an MQTT broker, `reply` will work exactly the same way as `send` above, and will send the message to all the clients subscribed to the given channel/topic. |

##### Anatomy of an outbound message

| Attribute | Type                        | Description                                                                                                                     |
| --------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| payload   | string                      | The payload/body of the message you want to send.                                                                               |
| headers   | object&lt;string,string&gt; | The headers/metadata of the message you want to send.                                                                           |
| channel   | string                      | The channel/topic you want to send the message to. Defaults to `event.channel`, i.e., the same channel as the received event.   |
| server    | string                      | The server/broker you want to send the message to. Defaults to `event.serverName`, i.e., the same server as the received event. |

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
