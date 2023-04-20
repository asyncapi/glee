[@asyncapi/glee](../README.md) / [lib/cluster](../modules/lib_cluster.md) / default

# Class: default

[lib/cluster](../modules/lib_cluster.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

  ↳↳ [`default`](adapters_cluster_redis.default.md)

## Table of contents

### Constructors

- [constructor](lib_cluster.default.md#constructor)

### Properties

- [\_glee](lib_cluster.default.md#_glee)
- [\_instanceId](lib_cluster.default.md#_instanceid)
- [\_serverName](lib_cluster.default.md#_servername)
- [\_serverUrlExpanded](lib_cluster.default.md#_serverurlexpanded)
- [captureRejectionSymbol](lib_cluster.default.md#capturerejectionsymbol)
- [captureRejections](lib_cluster.default.md#capturerejections)
- [defaultMaxListeners](lib_cluster.default.md#defaultmaxlisteners)
- [errorMonitor](lib_cluster.default.md#errormonitor)

### Accessors

- [glee](lib_cluster.default.md#glee)
- [instanceId](lib_cluster.default.md#instanceid)
- [serverName](lib_cluster.default.md#servername)
- [serverUrlExpanded](lib_cluster.default.md#serverurlexpanded)

### Methods

- [addListener](lib_cluster.default.md#addlistener)
- [connect](lib_cluster.default.md#connect)
- [deserializeMessage](lib_cluster.default.md#deserializemessage)
- [emit](lib_cluster.default.md#emit)
- [eventNames](lib_cluster.default.md#eventnames)
- [getMaxListeners](lib_cluster.default.md#getmaxlisteners)
- [listenerCount](lib_cluster.default.md#listenercount)
- [listeners](lib_cluster.default.md#listeners)
- [off](lib_cluster.default.md#off)
- [on](lib_cluster.default.md#on)
- [once](lib_cluster.default.md#once)
- [prependListener](lib_cluster.default.md#prependlistener)
- [prependOnceListener](lib_cluster.default.md#prependoncelistener)
- [rawListeners](lib_cluster.default.md#rawlisteners)
- [removeAllListeners](lib_cluster.default.md#removealllisteners)
- [removeListener](lib_cluster.default.md#removelistener)
- [send](lib_cluster.default.md#send)
- [serializeMessage](lib_cluster.default.md#serializemessage)
- [setMaxListeners](lib_cluster.default.md#setmaxlisteners)
- [getEventListeners](lib_cluster.default.md#geteventlisteners)
- [listenerCount](lib_cluster.default.md#listenercount-1)
- [on](lib_cluster.default.md#on-1)
- [once](lib_cluster.default.md#once-1)
- [setMaxListeners](lib_cluster.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`glee`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glee` | [`default`](lib_glee.default.md) |  |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/cluster.ts:46](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L46)

## Properties

### \_glee

• `Private` **\_glee**: [`default`](lib_glee.default.md)

#### Defined in

[src/lib/cluster.ts:36](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L36)

___

### \_instanceId

• `Private` **\_instanceId**: `string`

#### Defined in

[src/lib/cluster.ts:39](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L39)

___

### \_serverName

• `Private` **\_serverName**: `string`

#### Defined in

[src/lib/cluster.ts:37](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L37)

___

### \_serverUrlExpanded

• `Private` **\_serverUrlExpanded**: `string`

#### Defined in

[src/lib/cluster.ts:38](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L38)

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

### glee

• `get` **glee**(): [`default`](lib_glee.default.md)

#### Returns

[`default`](lib_glee.default.md)

#### Defined in

[src/lib/cluster.ts:93](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L93)

___

### instanceId

• `get` **instanceId**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/cluster.ts:105](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L105)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/cluster.ts:97](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L97)

___

### serverUrlExpanded

• `get` **serverUrlExpanded**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/cluster.ts:101](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L101)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### connect

▸ **connect**(): `Promise`<`any`\>

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/cluster.ts:112](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L112)

___

### deserializeMessage

▸ **deserializeMessage**(`serialized`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` |  |

#### Returns

[`default`](lib_message.default.md)

#### Defined in

[src/lib/cluster.ts:151](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L151)

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

### off

▸ **off**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_cluster.default.md)

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

▸ **removeAllListeners**(`event?`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### send

▸ **send**(`message`): `Promise`<`any`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/cluster.ts:121](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L121)

___

### serializeMessage

▸ **serializeMessage**(`message`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`string`

#### Defined in

[src/lib/cluster.ts:131](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/cluster.ts#L131)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_cluster.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](lib_cluster.default.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:520

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
