[@asyncapi/glee](../README.md) / [lib/glee](../modules/lib_glee.md) / default

# Class: default

[lib/glee](../modules/lib_glee.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](lib_glee.default.md#constructor)

### Properties

- [\_adapters](lib_glee.default.md#_adapters)
- [\_clusterAdapter](lib_glee.default.md#_clusteradapter)
- [\_options](lib_glee.default.md#_options)
- [\_router](lib_glee.default.md#_router)
- [captureRejectionSymbol](lib_glee.default.md#capturerejectionsymbol)
- [captureRejections](lib_glee.default.md#capturerejections)
- [defaultMaxListeners](lib_glee.default.md#defaultmaxlisteners)
- [errorMonitor](lib_glee.default.md#errormonitor)

### Accessors

- [adapters](lib_glee.default.md#adapters)
- [clusterAdapter](lib_glee.default.md#clusteradapter)
- [options](lib_glee.default.md#options)

### Methods

- [\_execErrorMiddleware](lib_glee.default.md#_execerrormiddleware)
- [\_processError](lib_glee.default.md#_processerror)
- [\_processMessage](lib_glee.default.md#_processmessage)
- [addAdapter](lib_glee.default.md#addadapter)
- [addListener](lib_glee.default.md#addlistener)
- [connect](lib_glee.default.md#connect)
- [emit](lib_glee.default.md#emit)
- [eventNames](lib_glee.default.md#eventnames)
- [getMaxListeners](lib_glee.default.md#getmaxlisteners)
- [injectError](lib_glee.default.md#injecterror)
- [injectMessage](lib_glee.default.md#injectmessage)
- [listen](lib_glee.default.md#listen)
- [listenerCount](lib_glee.default.md#listenercount)
- [listeners](lib_glee.default.md#listeners)
- [off](lib_glee.default.md#off)
- [on](lib_glee.default.md#on)
- [once](lib_glee.default.md#once)
- [prependListener](lib_glee.default.md#prependlistener)
- [prependOnceListener](lib_glee.default.md#prependoncelistener)
- [rawListeners](lib_glee.default.md#rawlisteners)
- [removeAllListeners](lib_glee.default.md#removealllisteners)
- [removeListener](lib_glee.default.md#removelistener)
- [send](lib_glee.default.md#send)
- [setClusterAdapter](lib_glee.default.md#setclusteradapter)
- [setMaxListeners](lib_glee.default.md#setmaxlisteners)
- [syncCluster](lib_glee.default.md#synccluster)
- [use](lib_glee.default.md#use)
- [useOutbound](lib_glee.default.md#useoutbound)
- [getEventListeners](lib_glee.default.md#geteventlisteners)
- [listenerCount](lib_glee.default.md#listenercount-1)
- [on](lib_glee.default.md#on-1)
- [once](lib_glee.default.md#once-1)
- [setMaxListeners](lib_glee.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`GleeConfig`](../modules/lib.md#gleeconfig) |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/lib/glee.ts:40](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L40)

## Properties

### \_adapters

• `Private` **\_adapters**: `AdapterRecord`[]

#### Defined in

[src/lib/glee.ts:32](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L32)

___

### \_clusterAdapter

• `Private` **\_clusterAdapter**: `ClusterAdapterRecord`

#### Defined in

[src/lib/glee.ts:33](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L33)

___

### \_options

• `Private` **\_options**: [`GleeConfig`](../modules/lib.md#gleeconfig)

#### Defined in

[src/lib/glee.ts:30](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L30)

___

### \_router

• `Private` **\_router**: [`default`](lib_router.default.md)

#### Defined in

[src/lib/glee.ts:31](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L31)

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

### adapters

• `get` **adapters**(): `AdapterRecord`[]

#### Returns

`AdapterRecord`[]

#### Defined in

[src/lib/glee.ts:52](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L52)

___

### clusterAdapter

• `get` **clusterAdapter**(): `ClusterAdapterRecord`

#### Returns

`ClusterAdapterRecord`

#### Defined in

[src/lib/glee.ts:56](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L56)

___

### options

• `get` **options**(): [`GleeConfig`](../modules/lib.md#gleeconfig)

#### Returns

[`GleeConfig`](../modules/lib.md#gleeconfig)

#### Defined in

[src/lib/glee.ts:48](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L48)

## Methods

### \_execErrorMiddleware

▸ `Private` **_execErrorMiddleware**(`emws`, `index`, `error`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `emws` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] |
| `index` | `number` |
| `error` | `Error` |
| `message` | [`default`](lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:264](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L264)

___

### \_processError

▸ `Private` **_processError**(`errorMiddlewares`, `error`, `message`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] |  |
| `error` | `Error` |  |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:257](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L257)

___

### \_processMessage

▸ `Private` **_processMessage**(`middlewares`, `errorMiddlewares`, `message`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] |  |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] |  |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:200](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L200)

___

### addAdapter

▸ **addAdapter**(`Adapter`, `«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Adapter` | typeof [`default`](lib_adapter.default.md) |
| `«destructured»` | `Object` |
| › `parsedAsyncAPI` | `AsyncAPIDocument` |
| › `server` | `Server` |
| › `serverName` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:68](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L68)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### connect

▸ **connect**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/glee.ts:123](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L123)

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

### injectError

▸ **injectError**(`error`, `channel?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `Error` |  |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:171](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L171)

___

### injectMessage

▸ **injectMessage**(`message`, `serverName`, `connection`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |
| `serverName` | `string` |  |
| `connection` | [`default`](lib_connection.default.md) | - |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:153](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L153)

___

### listen

▸ **listen**(): `Promise`<`any`[]\>

#### Returns

`Promise`<`any`[]\>

#### Defined in

[src/lib/glee.ts:142](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L142)

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

▸ **off**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](lib_glee.default.md)

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

▸ **removeAllListeners**(`event?`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:494

___

### send

▸ **send**(`message`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:110](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L110)

___

### setClusterAdapter

▸ **setClusterAdapter**(`Adapter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `Adapter` | typeof [`default`](lib_cluster.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:77](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L77)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](lib_glee.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:520

___

### syncCluster

▸ **syncCluster**(`message`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:184](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L184)

___

### use

▸ **use**(`...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:88](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L88)

▸ **use**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:89](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L89)

___

### useOutbound

▸ **useOutbound**(`...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:99](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L99)

▸ **useOutbound**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/glee.ts:100](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/glee.ts#L100)

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
