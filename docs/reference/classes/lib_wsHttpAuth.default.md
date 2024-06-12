[@asyncapi/glee](../README.md) / [lib/wsHttpAuth](../modules/lib_wsHttpAuth.md) / default

# Class: default

[lib/wsHttpAuth](../modules/lib_wsHttpAuth.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](lib_wsHttpAuth.default.md#constructor)

### Properties

- [AsyncAPIServer](lib_wsHttpAuth.default.md#asyncapiserver)
- [auth](lib_wsHttpAuth.default.md#auth)
- [authConfig](lib_wsHttpAuth.default.md#authconfig)
- [parsedAsyncAPI](lib_wsHttpAuth.default.md#parsedasyncapi)
- [secReqs](lib_wsHttpAuth.default.md#secreqs)
- [serverName](lib_wsHttpAuth.default.md#servername)
- [captureRejectionSymbol](lib_wsHttpAuth.default.md#capturerejectionsymbol)
- [captureRejections](lib_wsHttpAuth.default.md#capturerejections)
- [defaultMaxListeners](lib_wsHttpAuth.default.md#defaultmaxlisteners)
- [errorMonitor](lib_wsHttpAuth.default.md#errormonitor)

### Methods

- [addListener](lib_wsHttpAuth.default.md#addlistener)
- [checkAuthPresense](lib_wsHttpAuth.default.md#checkauthpresense)
- [checkClientAuthConfig](lib_wsHttpAuth.default.md#checkclientauthconfig)
- [emit](lib_wsHttpAuth.default.md#emit)
- [eventNames](lib_wsHttpAuth.default.md#eventnames)
- [formClientAuth](lib_wsHttpAuth.default.md#formclientauth)
- [getAuthConfig](lib_wsHttpAuth.default.md#getauthconfig)
- [getMaxListeners](lib_wsHttpAuth.default.md#getmaxlisteners)
- [getServerAuthProps](lib_wsHttpAuth.default.md#getserverauthprops)
- [httpApiKeyLogic](lib_wsHttpAuth.default.md#httpapikeylogic)
- [listenerCount](lib_wsHttpAuth.default.md#listenercount)
- [listeners](lib_wsHttpAuth.default.md#listeners)
- [off](lib_wsHttpAuth.default.md#off)
- [on](lib_wsHttpAuth.default.md#on)
- [once](lib_wsHttpAuth.default.md#once)
- [prependListener](lib_wsHttpAuth.default.md#prependlistener)
- [prependOnceListener](lib_wsHttpAuth.default.md#prependoncelistener)
- [processClientAuth](lib_wsHttpAuth.default.md#processclientauth)
- [rawListeners](lib_wsHttpAuth.default.md#rawlisteners)
- [removeAllListeners](lib_wsHttpAuth.default.md#removealllisteners)
- [removeListener](lib_wsHttpAuth.default.md#removelistener)
- [setMaxListeners](lib_wsHttpAuth.default.md#setmaxlisteners)
- [userPassApiKeyLogic](lib_wsHttpAuth.default.md#userpassapikeylogic)
- [getEventListeners](lib_wsHttpAuth.default.md#geteventlisteners)
- [listenerCount](lib_wsHttpAuth.default.md#listenercount-1)
- [on](lib_wsHttpAuth.default.md#on-1)
- [once](lib_wsHttpAuth.default.md#once-1)
- [setMaxListeners](lib_wsHttpAuth.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`AsyncAPIServer`, `parsedAsyncAPI`, `serverName`, `authConfig?`)

Instantiates authentication.

#### Parameters

| Name | Type |
| :------ | :------ |
| `AsyncAPIServer` | `ServerInterface` |
| `parsedAsyncAPI` | `AsyncAPIDocumentInterface` |
| `serverName` | `string` |
| `authConfig?` | `any` |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/wsHttpAuth.ts:17](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L17)

## Properties

### AsyncAPIServer

• `Private` **AsyncAPIServer**: `ServerInterface`

#### Defined in

[src/lib/wsHttpAuth.ts:10](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L10)

___

### auth

• `Private` **auth**: { `[key: string]`: `string`;  } \| { `[key: string]`: `string`[];  }

#### Defined in

[src/lib/wsHttpAuth.ts:12](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L12)

___

### authConfig

• `Private` **authConfig**: [`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md) \| [`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md)

#### Defined in

[src/lib/wsHttpAuth.ts:11](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L11)

___

### parsedAsyncAPI

• `Private` **parsedAsyncAPI**: `AsyncAPIDocumentInterface`

#### Defined in

[src/lib/wsHttpAuth.ts:8](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L8)

___

### secReqs

• `Private` **secReqs**: { `[key: string]`: `SecurityScheme`;  }[]

#### Defined in

[src/lib/wsHttpAuth.ts:7](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L7)

___

### serverName

• `Private` **serverName**: `string`

#### Defined in

[src/lib/wsHttpAuth.ts:9](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L9)

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

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

Alias for `emitter.on(eventName, listener)`.

**`Since`**

v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### checkAuthPresense

▸ **checkAuthPresense**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/wsHttpAuth.ts:164](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L164)

___

### checkClientAuthConfig

▸ **checkClientAuthConfig**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/lib/wsHttpAuth.ts:31](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L31)

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

### formClientAuth

▸ **formClientAuth**(`authKeys`, `«destructured»`): { `headers`: `any` ; `query`: `undefined` ; `url`: `any`  } \| { `headers`: `any` ; `query`: `any` ; `url`: `any`  }

#### Parameters

| Name | Type |
| :------ | :------ |
| `authKeys` | `any` |
| `«destructured»` | `Object` |

#### Returns

{ `headers`: `any` ; `query`: `undefined` ; `url`: `any`  } \| { `headers`: `any` ; `query`: `any` ; `url`: `any`  }

#### Defined in

[src/lib/wsHttpAuth.ts:59](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L59)

___

### getAuthConfig

▸ **getAuthConfig**(`auth`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `auth` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/wsHttpAuth.ts:46](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L46)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](lib_wsHttpAuth.default.md#defaultmaxlisteners).

**`Since`**

v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:526

___

### getServerAuthProps

▸ **getServerAuthProps**(`headers`, `query`): [`AuthProps`](../modules/lib.md#authprops)

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `any` |
| `query` | `any` |

#### Returns

[`AuthProps`](../modules/lib.md#authprops)

#### Defined in

[src/lib/wsHttpAuth.ts:122](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L122)

___

### httpApiKeyLogic

▸ `Private` **httpApiKeyLogic**(`scheme`, `headers`, `query`, `authKey`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scheme` | `any` |
| `headers` | `any` |
| `query` | `any` |
| `authKey` | `any` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `headers` | `any` |
| `query` | `any` |

#### Defined in

[src/lib/wsHttpAuth.ts:108](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L108)

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

### off

▸ **off**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

Alias for `emitter.removeListener()`.

**`Since`**

v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:650

___

### processClientAuth

▸ **processClientAuth**(`«destructured»`): `Promise`<{ `headers`: `any` ; `query`: `undefined` ; `url`: `any`  } \| { `headers`: `any` ; `query`: `any` ; `url`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Authenticatable`](../interfaces/lib.Authenticatable.md) |

#### Returns

`Promise`<{ `headers`: `any` ; `query`: `undefined` ; `url`: `any`  } \| { `headers`: `any` ; `query`: `any` ; `url`: `any`  }\>

#### Defined in

[src/lib/wsHttpAuth.ts:157](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L157)

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

▸ **removeAllListeners**(`event?`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_wsHttpAuth.default.md)

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

[`default`](lib_wsHttpAuth.default.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:520

___

### userPassApiKeyLogic

▸ `Private` **userPassApiKeyLogic**(`url`, `authKey`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `any` |
| `authKey` | `any` |

#### Returns

`any`

#### Defined in

[src/lib/wsHttpAuth.ts:92](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/wsHttpAuth.ts#L92)

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
