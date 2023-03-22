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
- [\_outbound](lib_message.default.md#_outbound)
- [\_params](lib_message.default.md#_params)
- [\_payload](lib_message.default.md#_payload)
- [\_query](lib_message.default.md#_query)
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
- [params](lib_message.default.md#params)
- [payload](lib_message.default.md#payload)
- [query](lib_message.default.md#query)
- [serverName](lib_message.default.md#servername)

### Methods

- [addListener](lib_message.default.md#addlistener)
- [emit](lib_message.default.md#emit)
- [eventNames](lib_message.default.md#eventnames)
- [getMaxListeners](lib_message.default.md#getmaxlisteners)
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
- [reply](lib_message.default.md#reply)
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

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IGleeMessageConstructor` |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/message.ts:51](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L51)

## Properties

### \_broadcast

• `Private` **\_broadcast**: `boolean`

#### Defined in

[src/lib/message.ts:31](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L31)

___

### \_channel

• `Private` **\_channel**: `string`

#### Defined in

[src/lib/message.ts:28](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L28)

___

### \_cluster

• `Private` **\_cluster**: `boolean`

#### Defined in

[src/lib/message.ts:34](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L34)

___

### \_connection

• `Private` **\_connection**: [`default`](lib_connection.default.md)

#### Defined in

[src/lib/message.ts:30](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L30)

___

### \_headers

• `Private` **\_headers**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/lib/message.ts:27](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L27)

___

### \_inbound

• `Private` **\_inbound**: `boolean`

#### Defined in

[src/lib/message.ts:32](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L32)

___

### \_outbound

• `Private` **\_outbound**: `boolean`

#### Defined in

[src/lib/message.ts:33](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L33)

___

### \_params

• `Private` **\_params**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/lib/message.ts:35](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L35)

___

### \_payload

• `Private` **\_payload**: `any`

#### Defined in

[src/lib/message.ts:26](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L26)

___

### \_query

• `Private` **\_query**: `QueryParam`

#### Defined in

[src/lib/message.ts:36](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L36)

___

### \_serverName

• `Private` **\_serverName**: `string`

#### Defined in

[src/lib/message.ts:29](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L29)

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

[src/lib/message.ts:113](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L113)

___

### channel

• `get` **channel**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/message.ts:89](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L89)

• `set` **channel**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:93](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L93)

___

### cluster

• `get` **cluster**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:125](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L125)

• `set` **cluster**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:129](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L129)

___

### connection

• `get` **connection**(): [`default`](lib_connection.default.md)

#### Returns

[`default`](lib_connection.default.md)

#### Defined in

[src/lib/message.ts:105](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L105)

• `set` **connection**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`default`](lib_connection.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:109](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L109)

___

### headers

• `get` **headers**(): `Object`

#### Returns

`Object`

#### Defined in

[src/lib/message.ts:81](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L81)

• `set` **headers**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:85](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L85)

___

### params

• `get` **params**(): `Object`

#### Returns

`Object`

#### Defined in

[src/lib/message.ts:117](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L117)

• `set` **params**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:121](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L121)

___

### payload

• `get` **payload**(): `any`

#### Returns

`any`

#### Defined in

[src/lib/message.ts:73](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L73)

• `set` **payload**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:77](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L77)

___

### query

• `get` **query**(): `QueryParam`

#### Returns

`QueryParam`

#### Defined in

[src/lib/message.ts:133](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L133)

• `set` **query**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `QueryParam` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:137](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L137)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/message.ts:97](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L97)

• `set` **serverName**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:101](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L101)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

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

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:669

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:526

___

### isInbound

▸ **isInbound**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:192](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L192)

___

### isOutbound

▸ **isOutbound**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/lib/message.ts:199](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L199)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:616

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

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

#### Returns

`void`

#### Defined in

[src/lib/message.ts:220](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L220)

___

### notifySuccessfulProcessing

▸ **notifySuccessfulProcessing**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/message.ts:213](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L213)

___

### off

▸ **off**(`eventName`, `listener`): [`default`](lib_message.default.md)

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:650

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

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

### reply

▸ **reply**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IReply` |

#### Returns

`void`

#### Defined in

[src/lib/message.ts:149](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L149)

___

### send

▸ **send**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/message.ts:206](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L206)

___

### setInbound

▸ **setInbound**(): `void`

#### Returns

`void`

#### Defined in

[src/lib/message.ts:176](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L176)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_message.default.md)

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

#### Returns

`void`

#### Defined in

[src/lib/message.ts:184](https://github.com/asyncapi/glee/blob/2557652/src/lib/message.ts#L184)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` |  |
| `eventName` | `string` \| `symbol` |  |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:271

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` |  |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:254

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

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

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `n?` | `number` |  |
| `...eventTargets` | (`EventEmitter` \| `_DOMEventTarget`)[] | - |

#### Returns

`void`

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:317
