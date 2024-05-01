[@asyncapi/glee](../README.md) / [lib/message](../modules/lib_message.md) / default

# Class: default

[lib/message](../modules/lib_message.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](lib_message.default.md#constructor)

### Properties

- [\_broadcast](lib_message.default.md#_broadcast)
- [\_channel](lib_message.default.md#_channel)
- [\_cluster](lib_message.default.md#_cluster)
- [\_connection](lib_message.default.md#_connection)
- [\_headers](lib_message.default.md#_headers)
- [\_inbound](lib_message.default.md#_inbound)
- [\_operation](lib_message.default.md#_operation)
- [\_outbound](lib_message.default.md#_outbound)
- [\_params](lib_message.default.md#_params)
- [\_payload](lib_message.default.md#_payload)
- [\_query](lib_message.default.md#_query)
- [\_request](lib_message.default.md#_request)
- [\_serverName](lib_message.default.md#_servername)
- [captureRejectionSymbol](lib_message.default.md#capturerejectionsymbol)
- [captureRejections](lib_message.default.md#capturerejections)
- [defaultMaxListeners](lib_message.default.md#defaultmaxlisteners)
- [errorMonitor](lib_message.default.md#errormonitor)

### Accessors

- [broadcast](lib_message.default.md#broadcast)
- [channel](lib_message.default.md#channel)
- [cluster](lib_message.default.md#cluster)
- [connection](lib_message.default.md#connection)
- [headers](lib_message.default.md#headers)
- [operation](lib_message.default.md#operation)
- [params](lib_message.default.md#params)
- [payload](lib_message.default.md#payload)
- [query](lib_message.default.md#query)
- [request](lib_message.default.md#request)
- [serverName](lib_message.default.md#servername)

### Methods

- [addListener](lib_message.default.md#addlistener)
- [emit](lib_message.default.md#emit)
- [eventNames](lib_message.default.md#eventnames)
- [getMaxListeners](lib_message.default.md#getmaxlisteners)
- [hasRequest](lib_message.default.md#hasrequest)
- [isInbound](lib_message.default.md#isinbound)
- [isOutbound](lib_message.default.md#isoutbound)
- [listenerCount](lib_message.default.md#listenercount)
- [listeners](lib_message.default.md#listeners)
- [notifyFailedProcessing](lib_message.default.md#notifyfailedprocessing)
- [notifySuccessfulProcessing](lib_message.default.md#notifysuccessfulprocessing)
- [off](lib_message.default.md#off)
- [on](lib_message.default.md#on)
- [once](lib_message.default.md#once)
- [prependListener](lib_message.default.md#prependlistener)
- [prependOnceListener](lib_message.default.md#prependoncelistener)
- [rawListeners](lib_message.default.md#rawlisteners)
- [removeAllListeners](lib_message.default.md#removealllisteners)
- [removeListener](lib_message.default.md#removelistener)
- [send](lib_message.default.md#send)
- [setInbound](lib_message.default.md#setinbound)
- [setMaxListeners](lib_message.default.md#setmaxlisteners)
- [setOutbound](lib_message.default.md#setoutbound)
- [getEventListeners](lib_message.default.md#geteventlisteners)
- [listenerCount](lib_message.default.md#listenercount-1)
- [on](lib_message.default.md#on-1)
- [once](lib_message.default.md#once-1)
- [setMaxListeners](lib_message.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`options`)

Instantiates a new GleeMessage.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IGleeMessageConstructor` |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/message.ts:52](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L52)

## Properties

### \_broadcast

• `Private` **\_broadcast**: `boolean`

#### Defined in

[src/lib/message.ts:28](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L28)

___

### \_channel

• `Private` **\_channel**: `string`

#### Defined in

[src/lib/message.ts:25](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L25)

___

### \_cluster

• `Private` **\_cluster**: `boolean`

#### Defined in

[src/lib/message.ts:33](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L33)

___

### \_connection

• `Private` **\_connection**: [`default`](lib_connection.default.md)

#### Defined in

[src/lib/message.ts:27](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L27)

___

### \_headers

• `Private` **\_headers**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/lib/message.ts:24](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L24)

___

### \_inbound

• `Private` **\_inbound**: `boolean`

#### Defined in

[src/lib/message.ts:29](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L29)

___

### \_operation

• `Private` **\_operation**: `OperationInterface`

#### Defined in

[src/lib/message.ts:31](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L31)

___

### \_outbound

• `Private` **\_outbound**: `boolean`

#### Defined in

[src/lib/message.ts:32](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L32)

___

### \_params

• `Private` **\_params**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/lib/message.ts:34](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L34)

___

### \_payload

• `Private` **\_payload**: `any`

#### Defined in

[src/lib/message.ts:23](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L23)

___

### \_query

• `Private` **\_query**: `QueryParam`

#### Defined in

[src/lib/message.ts:35](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L35)

___

### \_request

• `Private` **\_request**: [`default`](lib_message.default.md)

#### Defined in

[src/lib/message.ts:30](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L30)

___

### \_serverName

• `Private` **\_serverName**: `string`

#### Defined in

[src/lib/message.ts:26](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L26)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](adapters_cluster_redis.default.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:328

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:333

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:334

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](adapters_cluster_redis.default.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:327

## Accessors

### broadcast

• `get` **broadcast**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:139](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L139)

___

### channel

• `get` **channel**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/message.ts:115](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L115)

• `set` **channel**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:119](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L119)

___

### cluster

• `get` **cluster**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:151](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L151)

• `set` **cluster**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:155](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L155)

___

### connection

• `get` **connection**(): [`default`](lib_connection.default.md)

#### Returns

[`default`](lib_connection.default.md)

#### Defined in

[src/lib/message.ts:131](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L131)

• `set` **connection**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`default`](lib_connection.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:135](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L135)

___

### headers

• `get` **headers**(): `Object`

#### Returns

`Object`

#### Defined in

[src/lib/message.ts:107](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L107)

• `set` **headers**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:111](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L111)

___

### operation

• `get` **operation**(): `OperationInterface`

#### Returns

`OperationInterface`

#### Defined in

[src/lib/message.ts:98](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L98)

• `set` **operation**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `OperationInterface` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:102](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L102)

___

### params

• `get` **params**(): `Object`

#### Returns

`Object`

#### Defined in

[src/lib/message.ts:143](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L143)

• `set` **params**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:147](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L147)

___

### payload

• `get` **payload**(): `any`

#### Returns

`any`

#### Defined in

[src/lib/message.ts:78](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L78)

• `set` **payload**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:82](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L82)

___

### query

• `get` **query**(): `QueryParam`

#### Returns

`QueryParam`

#### Defined in

[src/lib/message.ts:159](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L159)

• `set` **query**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `QueryParam` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:163](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L163)

___

### request

• `get` **request**(): [`default`](lib_message.default.md)

#### Returns

[`default`](lib_message.default.md)

#### Defined in

[src/lib/message.ts:94](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L94)

• `set` **request**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`default`](lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:90](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L90)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/message.ts:123](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L123)

• `set` **serverName**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:127](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L127)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

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

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:610

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

**`Since`**

v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:669

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](lib_message.default.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:526

___

### hasRequest

▸ **hasRequest**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:86](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L86)

___

### isInbound

▸ **isInbound**(): `boolean`

Checks if it's an inbound message.

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:186](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L186)

___

### isOutbound

▸ **isOutbound**(): `boolean`

Checks if it's an outbound message.

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:193](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L193)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`Since`**

v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:616

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

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:539

___

### notifyFailedProcessing

▸ **notifyFailedProcessing**(): `void`

Indicates failure in processing the message

#### Returns

`void`

#### Defined in

[src/lib/message.ts:214](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L214)

___

### notifySuccessfulProcessing

▸ **notifySuccessfulProcessing**(): `void`

Indicates successfully processed the message

#### Returns

`void`

#### Defined in

[src/lib/message.ts:207](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L207)

___

### off

▸ **off**(`eventName`, `listener`): [`default`](lib_message.default.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](lib_message.default.md)

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

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_message.default.md)

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

**`Since`**

v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

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

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:650

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

**`Since`**

v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`default`](lib_message.default.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

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
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
will not remove them from`emit()` in progress. Subsequent events behave as expected.

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

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### send

▸ **send**(): `void`

Tells Glee to send the message.

#### Returns

`void`

#### Defined in

[src/lib/message.ts:200](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L200)

___

### setInbound

▸ **setInbound**(): `void`

Makes the message suitable only for the inbound pipeline.

#### Returns

`void`

#### Defined in

[src/lib/message.ts:170](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L170)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_message.default.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`Since`**

v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:520

___

### setOutbound

▸ **setOutbound**(): `void`

Makes the message suitable only for the outbound pipeline.

#### Returns

`void`

#### Defined in

[src/lib/message.ts:178](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/message.ts#L178)

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

**`Since`**

v15.2.0, v14.17.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `EventEmitter` \| `_DOMEventTarget` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:299

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

**`Since`**

v0.9.12

**`Deprecated`**

Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:271

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

**`Since`**

v13.6.0, v12.16.0

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

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:254

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

**`Since`**

v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:194

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `_DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:195

___

### setMaxListeners

▸ `Static` **setMaxListeners**(`n?`, `...eventTargets`): `void`

```js
const {
  setMaxListeners,
  EventEmitter
} = require('events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

**`Since`**

v15.4.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` | A non-negative number. The maximum number of listeners per `EventTarget` event. |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:317
