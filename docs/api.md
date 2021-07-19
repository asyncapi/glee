## Classes

<dl>
<dt><a href="#Glee">Glee</a></dt>
<dd></dd>
<dt><a href="#GleeAdapter">GleeAdapter</a></dt>
<dd></dd>
<dt><a href="#GleeConnection">GleeConnection</a></dt>
<dd></dd>
<dt><a href="#GleeMessage">GleeMessage</a></dt>
<dd></dd>
<dt><a href="#GleeRouter">GleeRouter</a></dt>
<dd></dd>
</dl>

<a name="Glee"></a>

## Glee
**Kind**: global class  

* [Glee](#Glee)
    * [new Glee([options])](#new_Glee_new)
    * [.addAdapter(adapter, serverName, server, parsedAsyncAPI)](#Glee+addAdapter)
    * [.use([channel])](#Glee+use)
    * [.useOutbound([channel])](#Glee+useOutbound)
    * [.send(message)](#Glee+send)
    * [.connect()](#Glee+connect) ⇒ <code>Promise</code>
    * [.listen()](#Glee+listen) ⇒ <code>Promise</code>
    * [.injectMessage(message, serverName, [connection])](#Glee+injectMessage)
    * [.injectError(error, [channel])](#Glee+injectError)

<a name="new_Glee_new"></a>

### new Glee([options])
Instantiates Glee.


| Param | Type | Default |
| --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | 

<a name="Glee+addAdapter"></a>

### glee.addAdapter(adapter, serverName, server, parsedAsyncAPI)
Adds a connection adapter.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| adapter | [<code>GleeAdapter</code>](#GleeAdapter) | The adapter. |
| serverName | <code>String</code> | The name of the AsyncAPI Server to use with the adapter. |
| server | <code>AsyncAPIServer</code> | AsyncAPI Server to use with the adapter. |
| parsedAsyncAPI | <code>AsyncAPIDocument</code> | The AsyncAPI document. |

<a name="Glee+use"></a>

### glee.use([channel])
Use a middleware for inbound messages.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>String</code> | The channel you want to scope the middleware to. |
| ...middlewares | <code>function</code> \| [<code>GleeRouter</code>](#GleeRouter) | A function or GleeRouter to use as a middleware. |

<a name="Glee+useOutbound"></a>

### glee.useOutbound([channel])
Use a middleware for outbound messages.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>String</code> | The channel you want to scope the middleware to. |
| ...middlewares | <code>function</code> \| [<code>GleeRouter</code>](#GleeRouter) | A function or GleeRouter to use as a middleware. |

<a name="Glee+send"></a>

### glee.send(message)
Send a message to the adapters.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>Object</code> \| [<code>GleeMessage</code>](#GleeMessage) | The payload of the message you want to send. |

<a name="Glee+connect"></a>

### glee.connect() ⇒ <code>Promise</code>
Tells the adapters to connect.

**Kind**: instance method of [<code>Glee</code>](#Glee)  
<a name="Glee+listen"></a>

### glee.listen() ⇒ <code>Promise</code>
Alias for `connect`.

**Kind**: instance method of [<code>Glee</code>](#Glee)  
<a name="Glee+injectMessage"></a>

### glee.injectMessage(message, serverName, [connection])
Injects a message into the Glee inbound middleware chain.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| message | [<code>GleeMessage</code>](#GleeMessage) | The message you want to send. |
| serverName | <code>String</code> | The name of the server this message is coming from. |
| [connection] | <code>Unknown</code> | The connection used when receiving the message. Its type is unknown and must be handled by the adapters. |

<a name="Glee+injectError"></a>

### glee.injectError(error, [channel])
Injects an error into the Glee inbound error middleware chain.

**Kind**: instance method of [<code>Glee</code>](#Glee)  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>Any</code> | The error. |
| [channel] | <code>String</code> | The channel of the error. |

<a name="GleeAdapter"></a>

## GleeAdapter
**Kind**: global class  

* [GleeAdapter](#GleeAdapter)
    * [new GleeAdapter(glee, serverName, server, parsedAsyncAPI)](#new_GleeAdapter_new)
    * [.getSubscribedChannels()](#GleeAdapter+getSubscribedChannels) ⇒ <code>Promise</code>
    * [.connect()](#GleeAdapter+connect) ⇒ <code>Promise</code>
    * [.send(message)](#GleeAdapter+send) ⇒ <code>Promise</code>

<a name="new_GleeAdapter_new"></a>

### new GleeAdapter(glee, serverName, server, parsedAsyncAPI)
Instantiates a Glee adapter.


| Param | Type | Description |
| --- | --- | --- |
| glee | [<code>Glee</code>](#Glee) | A reference to the Glee app. |
| serverName | <code>String</code> | The name of the AsyncAPI server to use for the connection. |
| server | <code>AsyncAPIServer</code> | The AsyncAPI server to use for the connection. |
| parsedAsyncAPI | <code>AsyncAPIDocument</code> | The AsyncAPI document. |

<a name="GleeAdapter+getSubscribedChannels"></a>

### gleeAdapter.getSubscribedChannels() ⇒ <code>Promise</code>
Returns a list of the channels a given adapter has to subscribe to.

**Kind**: instance method of [<code>GleeAdapter</code>](#GleeAdapter)  
<a name="GleeAdapter+connect"></a>

### gleeAdapter.connect() ⇒ <code>Promise</code>
Connects to the remote server.

**Kind**: instance method of [<code>GleeAdapter</code>](#GleeAdapter)  
<a name="GleeAdapter+send"></a>

### gleeAdapter.send(message) ⇒ <code>Promise</code>
Sends a message to the remote server.

**Kind**: instance method of [<code>GleeAdapter</code>](#GleeAdapter)  

| Param | Type | Description |
| --- | --- | --- |
| message | [<code>GleeMessage</code>](#GleeMessage) | The message to send. |

<a name="GleeConnection"></a>

## GleeConnection
**Kind**: global class  

* [GleeConnection](#GleeConnection)
    * [new GleeConnection(options)](#new_GleeConnection_new)
    * [.hasChannel(channelName)](#GleeConnection+hasChannel) ⇒ <code>Boolean</code>
    * [.getRaw()](#GleeConnection+getRaw) ⇒ <code>Any</code>

<a name="new_GleeConnection_new"></a>

### new GleeConnection(options)
Instantiates a Glee connection.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.channels | <code>Array.&lt;String&gt;</code> | The name of the channels associated to this connection. |
| options.serverName | <code>String</code> | The name of the AsyncAPI server the connection is pointing to. |
| options.server | <code>AsyncAPIServer</code> | The AsyncAPI server the connection is pointing to. |
| options.parsedAsyncAPI | <code>AsyncAPIDocument</code> | The AsyncAPI document. |

<a name="GleeConnection+hasChannel"></a>

### gleeConnection.hasChannel(channelName) ⇒ <code>Boolean</code>
Checks whether a channel is associated with this connection.

**Kind**: instance method of [<code>GleeConnection</code>](#GleeConnection)  

| Param | Type | Description |
| --- | --- | --- |
| channelName | <code>String</code> | The name of the channel. |

<a name="GleeConnection+getRaw"></a>

### gleeConnection.getRaw() ⇒ <code>Any</code>
Returns the real connection object.

**Kind**: instance method of [<code>GleeConnection</code>](#GleeConnection)  
<a name="GleeMessage"></a>

## GleeMessage
**Kind**: global class  

* [GleeMessage](#GleeMessage)
    * [new GleeMessage(options)](#new_GleeMessage_new)
    * [.reply(options)](#GleeMessage+reply)
    * [.setInbound()](#GleeMessage+setInbound)
    * [.setOutbound()](#GleeMessage+setOutbound)
    * [.send()](#GleeMessage+send)

<a name="new_GleeMessage_new"></a>

### new GleeMessage(options)
Instantiates a new GleeMessage.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| [options.payload] | <code>Any</code> |  | Message payload. |
| [options.headers] | <code>Object</code> |  | Message headers. |
| [options.channel] | <code>String</code> |  | Message channel. |
| [options.serverName] | <code>String</code> |  | The name of the associated AsyncAPI server. |
| [options.connection] | [<code>GleeConnection</code>](#GleeConnection) |  | The connection through which the message will be sent or has been received. |
| [options.broadcast] | <code>Boolean</code> | <code>false</code> | Whether the message should be broadcasted or not. |

<a name="GleeMessage+reply"></a>

### gleeMessage.reply(options)
Sends the message back to the server/broker.

**Kind**: instance method of [<code>GleeMessage</code>](#GleeMessage)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| [options.payload] | <code>Any</code> | The new message payload. Pass falsy value if you don't want to change it. |
| [options.headers] | <code>Object</code> \| <code>null</code> | The new message headers. Pass null if you want to remove them. |
| [options.channel] | <code>String</code> | The channel where the reply should go to. |

<a name="GleeMessage+setInbound"></a>

### gleeMessage.setInbound()
Makes the message suitable only for the inbound pipeline.

**Kind**: instance method of [<code>GleeMessage</code>](#GleeMessage)  
<a name="GleeMessage+setOutbound"></a>

### gleeMessage.setOutbound()
Makes the message suitable only for the outbound pipeline.

**Kind**: instance method of [<code>GleeMessage</code>](#GleeMessage)  
<a name="GleeMessage+send"></a>

### gleeMessage.send()
Tells Glee to send the message.

**Kind**: instance method of [<code>GleeMessage</code>](#GleeMessage)  
<a name="GleeRouter"></a>

## GleeRouter
**Kind**: global class  

* [GleeRouter](#GleeRouter)
    * [new GleeRouter()](#new_GleeRouter_new)
    * [.use([channel])](#GleeRouter+use)
    * [.useOutbound([channel])](#GleeRouter+useOutbound)
    * [.getMiddlewares()](#GleeRouter+getMiddlewares) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.getOutboundMiddlewares()](#GleeRouter+getOutboundMiddlewares) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.getErrorMiddlewares()](#GleeRouter+getErrorMiddlewares) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.getOutboundErrorMiddlewares()](#GleeRouter+getOutboundErrorMiddlewares) ⇒ <code>Array.&lt;function()&gt;</code>
    * [.addMiddlewares(middlewares, [channel])](#GleeRouter+addMiddlewares)
    * [.addOutboundMiddlewares(middlewares, [channel])](#GleeRouter+addOutboundMiddlewares)
    * [.addErrorMiddlewares(errorMiddlewares, [channel])](#GleeRouter+addErrorMiddlewares)
    * [.addOutboundErrorMiddlewares(errorMiddlewares, [channel])](#GleeRouter+addOutboundErrorMiddlewares)

<a name="new_GleeRouter_new"></a>

### new GleeRouter()
Instantiates a GleeRouter.

<a name="GleeRouter+use"></a>

### gleeRouter.use([channel])
Use a middleware for inbound messages. Please, note that when passing a GleeRouter as a param,
this function will make use of inbound and outbound middlewares.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>String</code> | The channel you want to scope the middleware to. |
| ...middlewares | <code>function</code> \| [<code>GleeRouter</code>](#GleeRouter) | A function or GleeRouter to use as a middleware. |

<a name="GleeRouter+useOutbound"></a>

### gleeRouter.useOutbound([channel])
Use a middleware for outbound messages.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| [channel] | <code>String</code> | The channel you want to scope the middleware to. |
| ...middlewares | <code>function</code> \| [<code>GleeRouter</code>](#GleeRouter) | A function or GleeRouter to use as a middleware. |

<a name="GleeRouter+getMiddlewares"></a>

### gleeRouter.getMiddlewares() ⇒ <code>Array.&lt;function()&gt;</code>
Returns all the inbound middlewares.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  
<a name="GleeRouter+getOutboundMiddlewares"></a>

### gleeRouter.getOutboundMiddlewares() ⇒ <code>Array.&lt;function()&gt;</code>
Returns all the outbound middlewares.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  
<a name="GleeRouter+getErrorMiddlewares"></a>

### gleeRouter.getErrorMiddlewares() ⇒ <code>Array.&lt;function()&gt;</code>
Returns all the inbound error middlewares.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  
<a name="GleeRouter+getOutboundErrorMiddlewares"></a>

### gleeRouter.getOutboundErrorMiddlewares() ⇒ <code>Array.&lt;function()&gt;</code>
Returns all the outbound error middlewares.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  
<a name="GleeRouter+addMiddlewares"></a>

### gleeRouter.addMiddlewares(middlewares, [channel])
Adds a normalized middleware to the inbound middlewares collection.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| middlewares | <code>Array</code> | The middlewares to add to the collection. |
| [channel] | <code>String</code> | The scope channel. |

<a name="GleeRouter+addOutboundMiddlewares"></a>

### gleeRouter.addOutboundMiddlewares(middlewares, [channel])
Adds a normalized middleware to the outbound middlewares collection.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| middlewares | <code>Array</code> | The middlewares to add to the collection. |
| [channel] | <code>String</code> | The scope channel. |

<a name="GleeRouter+addErrorMiddlewares"></a>

### gleeRouter.addErrorMiddlewares(errorMiddlewares, [channel])
Adds a normalized middleware to the inbound error middlewares collection.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| errorMiddlewares | <code>Array</code> | The middlewares to add to the collection. |
| [channel] | <code>String</code> | The scope channel. |

<a name="GleeRouter+addOutboundErrorMiddlewares"></a>

### gleeRouter.addOutboundErrorMiddlewares(errorMiddlewares, [channel])
Adds a normalized middleware to the outbound error middlewares collection.

**Kind**: instance method of [<code>GleeRouter</code>](#GleeRouter)  

| Param | Type | Description |
| --- | --- | --- |
| errorMiddlewares | <code>Array</code> | The middlewares to add to the collection. |
| [channel] | <code>String</code> | The scope channel. |

