[@asyncapi/glee](../README.md) / [lib/adapter](../modules/lib_adapter.md) / default

# Class: default

[lib/adapter](../modules/lib_adapter.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

  ↳↳ [`default`](adapters_http_client.default.md)

  ↳↳ [`default`](adapters_http_server.default.md)

  ↳↳ [`default`](adapters_kafka.default.md)

  ↳↳ [`default`](adapters_mqtt.default.md)

  ↳↳ [`default`](adapters_socket_io.default.md)

  ↳↳ [`default`](adapters_ws_client.default.md)

  ↳↳ [`default`](adapters_ws_server.default.md)

## Table of contents

### Constructors

- [constructor](lib_adapter.default.md#constructor)

### Properties

- [\_AsyncAPIServer](lib_adapter.default.md#_asyncapiserver)
- [\_channelNames](lib_adapter.default.md#_channelnames)
- [\_connections](lib_adapter.default.md#_connections)
- [\_glee](lib_adapter.default.md#_glee)
- [\_parsedAsyncAPI](lib_adapter.default.md#_parsedasyncapi)
- [\_serverName](lib_adapter.default.md#_servername)
- [\_serverUrlExpanded](lib_adapter.default.md#_serverurlexpanded)
- [captureRejectionSymbol](lib_adapter.default.md#capturerejectionsymbol)
- [captureRejections](lib_adapter.default.md#capturerejections)
- [defaultMaxListeners](lib_adapter.default.md#defaultmaxlisteners)
- [errorMonitor](lib_adapter.default.md#errormonitor)

### Accessors

- [AsyncAPIServer](lib_adapter.default.md#asyncapiserver)
- [channelNames](lib_adapter.default.md#channelnames)
- [connections](lib_adapter.default.md#connections)
- [glee](lib_adapter.default.md#glee)
- [parsedAsyncAPI](lib_adapter.default.md#parsedasyncapi)
- [serverName](lib_adapter.default.md#servername)
- [serverUrlExpanded](lib_adapter.default.md#serverurlexpanded)

### Methods

- [addListener](lib_adapter.default.md#addlistener)
- [connect](lib_adapter.default.md#connect)
- [emit](lib_adapter.default.md#emit)
- [eventNames](lib_adapter.default.md#eventnames)
- [getAuthConfig](lib_adapter.default.md#getauthconfig)
- [getMaxListeners](lib_adapter.default.md#getmaxlisteners)
- [getSubscribedChannels](lib_adapter.default.md#getsubscribedchannels)
- [listenerCount](lib_adapter.default.md#listenercount)
- [listeners](lib_adapter.default.md#listeners)
- [off](lib_adapter.default.md#off)
- [on](lib_adapter.default.md#on)
- [once](lib_adapter.default.md#once)
- [prependListener](lib_adapter.default.md#prependlistener)
- [prependOnceListener](lib_adapter.default.md#prependoncelistener)
- [rawListeners](lib_adapter.default.md#rawlisteners)
- [removeAllListeners](lib_adapter.default.md#removealllisteners)
- [removeListener](lib_adapter.default.md#removelistener)
- [resolveProtocolConfig](lib_adapter.default.md#resolveprotocolconfig)
- [send](lib_adapter.default.md#send)
- [setMaxListeners](lib_adapter.default.md#setmaxlisteners)
- [getEventListeners](lib_adapter.default.md#geteventlisteners)
- [listenerCount](lib_adapter.default.md#listenercount-1)
- [on](lib_adapter.default.md#on-1)
- [once](lib_adapter.default.md#once-1)
- [setMaxListeners](lib_adapter.default.md#setmaxlisteners-1)

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

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/adapter.ts:33](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L33)

## Properties

### \_AsyncAPIServer

• `Private` **\_AsyncAPIServer**: `Server`

#### Defined in

[src/lib/adapter.ts:19](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L19)

___

### \_channelNames

• `Private` **\_channelNames**: `string`[]

#### Defined in

[src/lib/adapter.ts:21](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L21)

___

### \_connections

• `Private` **\_connections**: [`default`](lib_connection.default.md)[]

#### Defined in

[src/lib/adapter.ts:22](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L22)

___

### \_glee

• `Private` **\_glee**: [`default`](lib_glee.default.md)

#### Defined in

[src/lib/adapter.ts:17](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L17)

___

### \_parsedAsyncAPI

• `Private` **\_parsedAsyncAPI**: `AsyncAPIDocument`

#### Defined in

[src/lib/adapter.ts:20](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L20)

___

### \_serverName

• `Private` **\_serverName**: `string`

#### Defined in

[src/lib/adapter.ts:18](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L18)

___

### \_serverUrlExpanded

• `Private` **\_serverUrlExpanded**: `string`

#### Defined in

[src/lib/adapter.ts:23](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L23)

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

### AsyncAPIServer

• `get` **AsyncAPIServer**(): `Server`

#### Returns

`Server`

#### Defined in

[src/lib/adapter.ts:133](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L133)

___

### channelNames

• `get` **channelNames**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/lib/adapter.ts:141](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L141)

___

### connections

• `get` **connections**(): [`default`](lib_connection.default.md)[]

#### Returns

[`default`](lib_connection.default.md)[]

#### Defined in

[src/lib/adapter.ts:145](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L145)

___

### glee

• `get` **glee**(): [`default`](lib_glee.default.md)

#### Returns

[`default`](lib_glee.default.md)

#### Defined in

[src/lib/adapter.ts:125](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L125)

___

### parsedAsyncAPI

• `get` **parsedAsyncAPI**(): `AsyncAPIDocument`

#### Returns

`AsyncAPIDocument`

#### Defined in

[src/lib/adapter.ts:137](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L137)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/adapter.ts:129](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L129)

___

### serverUrlExpanded

• `get` **serverUrlExpanded**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/adapter.ts:149](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L149)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_adapter.default.md)

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

[src/lib/adapter.ts:189](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L189)

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

### getAuthConfig

▸ **getAuthConfig**(`auth`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `auth` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/adapter.ts:162](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L162)

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

### getSubscribedChannels

▸ **getSubscribedChannels**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/lib/adapter.ts:175](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L175)

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

▸ **off**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_adapter.default.md)

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

▸ **removeAllListeners**(`event?`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_adapter.default.md)

#### Inherited from

EventEmitter.removeListener

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

#### Defined in

[src/lib/adapter.ts:153](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L153)

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

[src/lib/adapter.ts:198](https://github.com/asyncapi/glee/blob/2557652/src/lib/adapter.ts#L198)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_adapter.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](lib_adapter.default.md)

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
