[@asyncapi/glee](../README.md) / [adapters/socket.io](../modules/adapters_socket_io.md) / default

# Class: default

[adapters/socket.io](../modules/adapters_socket_io.md).default

## Hierarchy

- [`default`](lib_adapter.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](adapters_socket_io.default.md#constructor)

### Properties

- [server](adapters_socket_io.default.md#server)
- [captureRejectionSymbol](adapters_socket_io.default.md#capturerejectionsymbol)
- [captureRejections](adapters_socket_io.default.md#capturerejections)
- [defaultMaxListeners](adapters_socket_io.default.md#defaultmaxlisteners)
- [errorMonitor](adapters_socket_io.default.md#errormonitor)

### Accessors

- [AsyncAPIServer](adapters_socket_io.default.md#asyncapiserver)
- [channelNames](adapters_socket_io.default.md#channelnames)
- [connections](adapters_socket_io.default.md#connections)
- [glee](adapters_socket_io.default.md#glee)
- [parsedAsyncAPI](adapters_socket_io.default.md#parsedasyncapi)
- [serverName](adapters_socket_io.default.md#servername)
- [serverUrlExpanded](adapters_socket_io.default.md#serverurlexpanded)

### Methods

- [\_connect](adapters_socket_io.default.md#_connect)
- [\_createMessage](adapters_socket_io.default.md#_createmessage)
- [\_send](adapters_socket_io.default.md#_send)
- [addListener](adapters_socket_io.default.md#addlistener)
- [connect](adapters_socket_io.default.md#connect)
- [emit](adapters_socket_io.default.md#emit)
- [eventNames](adapters_socket_io.default.md#eventnames)
- [getMaxListeners](adapters_socket_io.default.md#getmaxlisteners)
- [getSubscribedChannels](adapters_socket_io.default.md#getsubscribedchannels)
- [listenerCount](adapters_socket_io.default.md#listenercount)
- [listeners](adapters_socket_io.default.md#listeners)
- [name](adapters_socket_io.default.md#name)
- [off](adapters_socket_io.default.md#off)
- [on](adapters_socket_io.default.md#on)
- [once](adapters_socket_io.default.md#once)
- [prependListener](adapters_socket_io.default.md#prependlistener)
- [prependOnceListener](adapters_socket_io.default.md#prependoncelistener)
- [rawListeners](adapters_socket_io.default.md#rawlisteners)
- [removeAllListeners](adapters_socket_io.default.md#removealllisteners)
- [removeListener](adapters_socket_io.default.md#removelistener)
- [send](adapters_socket_io.default.md#send)
- [setMaxListeners](adapters_socket_io.default.md#setmaxlisteners)
- [getEventListeners](adapters_socket_io.default.md#geteventlisteners)
- [listenerCount](adapters_socket_io.default.md#listenercount)
- [on](adapters_socket_io.default.md#on)
- [once](adapters_socket_io.default.md#once)

## Constructors

### constructor

• **new default**(`glee`, `serverName`, `server`, `parsedAsyncAPI`)

Instantiates a Glee adapter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glee` | [`default`](lib_glee.default.md) | A reference to the Glee app. |
| `serverName` | `string` | The name of the AsyncAPI server to use for the connection. |
| `server` | `Server` | The AsyncAPI server to use for the connection. |
| `parsedAsyncAPI` | `AsyncAPIDocument` | The AsyncAPI document. |

#### Inherited from

[default](lib_adapter.default.md).[constructor](lib_adapter.default.md#constructor)

#### Defined in

[src/lib/adapter.ts:31](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L31)

## Properties

### server

• `Private` **server**: `Server`<`DefaultEventsMap`, `DefaultEventsMap`, `DefaultEventsMap`, `any`\>

#### Defined in

[src/adapters/socket.io/index.ts:6](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L6)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](adapters_mqtt.default.md#capturerejectionsymbol)

#### Inherited from

[default](lib_adapter.default.md).[captureRejectionSymbol](lib_adapter.default.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

[default](lib_adapter.default.md).[captureRejections](lib_adapter.default.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[default](lib_adapter.default.md).[defaultMaxListeners](lib_adapter.default.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](adapters_mqtt.default.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

[default](lib_adapter.default.md).[errorMonitor](lib_adapter.default.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:272

## Accessors

### AsyncAPIServer

• `get` **AsyncAPIServer**(): `Server`

#### Returns

`Server`

#### Inherited from

Adapter.AsyncAPIServer

#### Defined in

[src/lib/adapter.ts:131](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L131)

___

### channelNames

• `get` **channelNames**(): `string`[]

#### Returns

`string`[]

#### Inherited from

Adapter.channelNames

#### Defined in

[src/lib/adapter.ts:139](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L139)

___

### connections

• `get` **connections**(): [`default`](lib_connection.default.md)[]

#### Returns

[`default`](lib_connection.default.md)[]

#### Inherited from

Adapter.connections

#### Defined in

[src/lib/adapter.ts:143](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L143)

___

### glee

• `get` **glee**(): [`default`](lib_glee.default.md)

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

Adapter.glee

#### Defined in

[src/lib/adapter.ts:123](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L123)

___

### parsedAsyncAPI

• `get` **parsedAsyncAPI**(): `AsyncAPIDocument`

#### Returns

`AsyncAPIDocument`

#### Inherited from

Adapter.parsedAsyncAPI

#### Defined in

[src/lib/adapter.ts:135](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L135)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Inherited from

Adapter.serverName

#### Defined in

[src/lib/adapter.ts:127](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L127)

___

### serverUrlExpanded

• `get` **serverUrlExpanded**(): `string`

#### Returns

`string`

#### Inherited from

Adapter.serverUrlExpanded

#### Defined in

[src/lib/adapter.ts:147](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L147)

## Methods

### \_connect

▸ **_connect**(): `Promise`<[`default`](adapters_socket_io.default.md)\>

#### Returns

`Promise`<[`default`](adapters_socket_io.default.md)\>

#### Defined in

[src/adapters/socket.io/index.ts:20](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L20)

___

### \_createMessage

▸ **_createMessage**(`eventName`, `payload`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `payload` | `any` |

#### Returns

[`default`](lib_message.default.md)

#### Defined in

[src/adapters/socket.io/index.ts:85](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L85)

___

### \_send

▸ **_send**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](lib_message.default.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/adapters/socket.io/index.ts:67](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L67)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[addListener](lib_adapter.default.md#addlistener)

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### connect

▸ **connect**(): `Promise`<[`default`](adapters_socket_io.default.md)\>

Connects to the remote server.

#### Returns

`Promise`<[`default`](adapters_socket_io.default.md)\>

#### Overrides

[default](lib_adapter.default.md).[connect](lib_adapter.default.md#connect)

#### Defined in

[src/adapters/socket.io/index.ts:12](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L12)

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

[default](lib_adapter.default.md).[emit](lib_adapter.default.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[default](lib_adapter.default.md).[eventNames](lib_adapter.default.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](adapters_socket_io.default.md#defaultmaxlisteners).

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

[default](lib_adapter.default.md).[getMaxListeners](lib_adapter.default.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### getSubscribedChannels

▸ **getSubscribedChannels**(): `string`[]

Returns a list of the channels a given adapter has to subscribe to.

#### Returns

`string`[]

#### Inherited from

[default](lib_adapter.default.md).[getSubscribedChannels](lib_adapter.default.md#getsubscribedchannels)

#### Defined in

[src/lib/adapter.ts:154](https://github.com/fmvilas/glee/blob/039da07/src/lib/adapter.ts#L154)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

[default](lib_adapter.default.md).[listenerCount](lib_adapter.default.md#listenercount)

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[default](lib_adapter.default.md).[listeners](lib_adapter.default.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### name

▸ **name**(): `string`

#### Returns

`string`

#### Defined in

[src/adapters/socket.io/index.ts:8](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L8)

___

### off

▸ **off**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[off](lib_adapter.default.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[on](lib_adapter.default.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### once

▸ **once**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[prependListener](lib_adapter.default.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[prependOnceListener](lib_adapter.default.md#prependoncelistener)

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[default](lib_adapter.default.md).[rawListeners](lib_adapter.default.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`default`](adapters_socket_io.default.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[removeAllListeners](lib_adapter.default.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](adapters_socket_io.default.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[removeListener](lib_adapter.default.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### send

▸ **send**(`message`): `Promise`<`void`\>

Sends a message to the remote server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](lib_message.default.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[default](lib_adapter.default.md).[send](lib_adapter.default.md#send)

#### Defined in

[src/adapters/socket.io/index.ts:16](https://github.com/fmvilas/glee/blob/039da07/src/adapters/socket.io/index.ts#L16)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](adapters_socket_io.default.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](adapters_socket_io.default.md)

#### Inherited from

[default](lib_adapter.default.md).[setMaxListeners](lib_adapter.default.md#setmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`since`** v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` \| `EventEmitter` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

[default](lib_adapter.default.md).[getEventListeners](lib_adapter.default.md#geteventlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`since`** v0.9.12

**`deprecated`** Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

[default](lib_adapter.default.md).[listenerCount](lib_adapter.default.md#listenercount)

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`since`** v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

[default](lib_adapter.default.md).[on](lib_adapter.default.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`since`** v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:158
