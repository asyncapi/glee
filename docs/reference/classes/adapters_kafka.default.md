[@asyncapi/glee](../README.md) / [adapters/kafka](../modules/adapters_kafka.md) / default

# Class: default

[adapters/kafka](../modules/adapters_kafka.md).default

## Hierarchy

- [`default`](lib_adapter.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](adapters_kafka.default.md#constructor)

### Properties

- [firstConnect](adapters_kafka.default.md#firstconnect)
- [kafka](adapters_kafka.default.md#kafka)
- [captureRejectionSymbol](adapters_kafka.default.md#capturerejectionsymbol)
- [captureRejections](adapters_kafka.default.md#capturerejections)
- [defaultMaxListeners](adapters_kafka.default.md#defaultmaxlisteners)
- [errorMonitor](adapters_kafka.default.md#errormonitor)

### Accessors

- [AsyncAPIServer](adapters_kafka.default.md#asyncapiserver)
- [channelNames](adapters_kafka.default.md#channelnames)
- [connections](adapters_kafka.default.md#connections)
- [glee](adapters_kafka.default.md#glee)
- [parsedAsyncAPI](adapters_kafka.default.md#parsedasyncapi)
- [serverName](adapters_kafka.default.md#servername)
- [serverUrlExpanded](adapters_kafka.default.md#serverurlexpanded)

### Methods

- [\_createMessage](adapters_kafka.default.md#_createmessage)
- [addListener](adapters_kafka.default.md#addlistener)
- [connect](adapters_kafka.default.md#connect)
- [emit](adapters_kafka.default.md#emit)
- [eventNames](adapters_kafka.default.md#eventnames)
- [getAuthConfig](adapters_kafka.default.md#getauthconfig)
- [getMaxListeners](adapters_kafka.default.md#getmaxlisteners)
- [getSubscribedChannels](adapters_kafka.default.md#getsubscribedchannels)
- [listenerCount](adapters_kafka.default.md#listenercount)
- [listeners](adapters_kafka.default.md#listeners)
- [name](adapters_kafka.default.md#name)
- [off](adapters_kafka.default.md#off)
- [on](adapters_kafka.default.md#on)
- [once](adapters_kafka.default.md#once)
- [prependListener](adapters_kafka.default.md#prependlistener)
- [prependOnceListener](adapters_kafka.default.md#prependoncelistener)
- [rawListeners](adapters_kafka.default.md#rawlisteners)
- [removeAllListeners](adapters_kafka.default.md#removealllisteners)
- [removeListener](adapters_kafka.default.md#removelistener)
- [resolveProtocolConfig](adapters_kafka.default.md#resolveprotocolconfig)
- [send](adapters_kafka.default.md#send)
- [setMaxListeners](adapters_kafka.default.md#setmaxlisteners)
- [getEventListeners](adapters_kafka.default.md#geteventlisteners)
- [listenerCount](adapters_kafka.default.md#listenercount-1)
- [on](adapters_kafka.default.md#on-1)
- [once](adapters_kafka.default.md#once-1)
- [setMaxListeners](adapters_kafka.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`glee`, `serverName`, `server`, `parsedAsyncAPI`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glee` | [`default`](lib_glee.default.md) |  |
| `serverName` | `string` |  |
| `server` | `Server` |  |
| `parsedAsyncAPI` | `AsyncAPIDocument` |  |

#### Inherited from

[default](lib_adapter.default.md).[constructor](lib_adapter.default.md#constructor)

#### Defined in

[src/lib/adapter.ts:33](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L33)

## Properties

### firstConnect

• `Private` **firstConnect**: `boolean` = `true`

#### Defined in

[src/adapters/kafka/index.ts:8](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L8)

___

### kafka

• `Private` **kafka**: `Kafka`

#### Defined in

[src/adapters/kafka/index.ts:7](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L7)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](adapters_cluster_redis.default.md#capturerejectionsymbol)

#### Inherited from

[default](lib_adapter.default.md).[captureRejectionSymbol](lib_adapter.default.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:328

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[default](lib_adapter.default.md).[captureRejections](lib_adapter.default.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:333

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[default](lib_adapter.default.md).[defaultMaxListeners](lib_adapter.default.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:334

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](adapters_cluster_redis.default.md#errormonitor)

#### Inherited from

[default](lib_adapter.default.md).[errorMonitor](lib_adapter.default.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:327

## Accessors

### AsyncAPIServer

• `get` **AsyncAPIServer**(): `Server`

#### Returns

`Server`

#### Inherited from

Adapter.AsyncAPIServer

#### Defined in

[src/lib/adapter.ts:133](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L133)

___

### channelNames

• `get` **channelNames**(): `string`[]

#### Returns

`string`[]

#### Inherited from

Adapter.channelNames

#### Defined in

[src/lib/adapter.ts:141](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L141)

___

### connections

• `get` **connections**(): [`default`](lib_connection.default.md)[]

#### Returns

[`default`](lib_connection.default.md)[]

#### Inherited from

Adapter.connections

#### Defined in

[src/lib/adapter.ts:145](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L145)

___

### glee

• `get` **glee**(): [`default`](lib_glee.default.md)

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

Adapter.glee

#### Defined in

[src/lib/adapter.ts:125](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L125)

___

### parsedAsyncAPI

• `get` **parsedAsyncAPI**(): `AsyncAPIDocument`

#### Returns

`AsyncAPIDocument`

#### Inherited from

Adapter.parsedAsyncAPI

#### Defined in

[src/lib/adapter.ts:137](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L137)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Inherited from

Adapter.serverName

#### Defined in

[src/lib/adapter.ts:129](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L129)

___

### serverUrlExpanded

• `get` **serverUrlExpanded**(): `string`

#### Returns

`string`

#### Inherited from

Adapter.serverUrlExpanded

#### Defined in

[src/lib/adapter.ts:149](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L149)

## Methods

### \_createMessage

▸ **_createMessage**(`topic`, `partition`, `message`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | `any` |
| `partition` | `any` |
| `message` | `any` |

#### Returns

[`default`](lib_message.default.md)

#### Defined in

[src/adapters/kafka/index.ts:85](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L85)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[addListener](lib_adapter.default.md#addlistener)

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### connect

▸ **connect**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Overrides

[default](lib_adapter.default.md).[connect](lib_adapter.default.md#connect)

#### Defined in

[src/adapters/kafka/index.ts:13](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L13)

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

[default](lib_adapter.default.md).[emit](lib_adapter.default.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:610

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[default](lib_adapter.default.md).[eventNames](lib_adapter.default.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:669

___

### getAuthConfig

▸ **getAuthConfig**(`auth`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `auth` | `any` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[default](lib_adapter.default.md).[getAuthConfig](lib_adapter.default.md#getauthconfig)

#### Defined in

[src/lib/adapter.ts:162](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L162)

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[default](lib_adapter.default.md).[getMaxListeners](lib_adapter.default.md#getmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:526

___

### getSubscribedChannels

▸ **getSubscribedChannels**(): `string`[]

#### Returns

`string`[]

#### Inherited from

[default](lib_adapter.default.md).[getSubscribedChannels](lib_adapter.default.md#getsubscribedchannels)

#### Defined in

[src/lib/adapter.ts:175](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L175)

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

[default](lib_adapter.default.md).[listenerCount](lib_adapter.default.md#listenercount)

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

[default](lib_adapter.default.md).[listeners](lib_adapter.default.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:539

___

### name

▸ **name**(): `string`

#### Returns

`string`

#### Defined in

[src/adapters/kafka/index.ts:9](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L9)

___

### off

▸ **off**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[off](lib_adapter.default.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[on](lib_adapter.default.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[prependListener](lib_adapter.default.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[prependOnceListener](lib_adapter.default.md#prependoncelistener)

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

[default](lib_adapter.default.md).[rawListeners](lib_adapter.default.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[removeAllListeners](lib_adapter.default.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[removeListener](lib_adapter.default.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### resolveProtocolConfig

▸ **resolveProtocolConfig**(`protocol`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `protocol` | `string` |

#### Returns

`Promise`<`any`\>

#### Inherited from

[default](lib_adapter.default.md).[resolveProtocolConfig](lib_adapter.default.md#resolveprotocolconfig)

#### Defined in

[src/lib/adapter.ts:153](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/adapter.ts#L153)

___

### send

▸ **send**(`message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](lib_message.default.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[default](lib_adapter.default.md).[send](lib_adapter.default.md#send)

#### Defined in

[src/adapters/kafka/index.ts:71](https://github.com/asyncapi/glee/blob/8907e8a/src/adapters/kafka/index.ts#L71)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](adapters_kafka.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](adapters_kafka.default.md)

#### Inherited from

[default](lib_adapter.default.md).[setMaxListeners](lib_adapter.default.md#setmaxlisteners)

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

[default](lib_adapter.default.md).[getEventListeners](lib_adapter.default.md#geteventlisteners)

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

[default](lib_adapter.default.md).[listenerCount](lib_adapter.default.md#listenercount-1)

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

[default](lib_adapter.default.md).[on](lib_adapter.default.md#on-1)

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

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once-1)

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

[default](lib_adapter.default.md).[once](lib_adapter.default.md#once-1)

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

[default](lib_adapter.default.md).[setMaxListeners](lib_adapter.default.md#setmaxlisteners-1)

#### Defined in

node_modules/@types/node/events.d.ts:317
