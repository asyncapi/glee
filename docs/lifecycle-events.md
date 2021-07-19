# Lifecycle Events

Glee lets you bind incoming messages to [functions](./functions.md). However, sometimes we need to be proactive and be the first ones to send a message, not necessarily as a reaction to another message. Use cases can be very diverse: from sending a message to announce our client is connected to sending a message every few seconds or minutes.

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