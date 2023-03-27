[@asyncapi/glee](../README.md) / [adapters/cluster/redis](../modules/adapters_cluster_redis.md) / default

# Class: default

[adapters/cluster/redis](../modules/adapters_cluster_redis.md).default

## Hierarchy

- [`default`](lib_cluster.default.md)

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](adapters_cluster_redis.default.md#constructor)

### Properties

- [\_channelName](adapters_cluster_redis.default.md#_channelname)
- [\_publisher](adapters_cluster_redis.default.md#_publisher)
- [captureRejectionSymbol](adapters_cluster_redis.default.md#capturerejectionsymbol)
- [captureRejections](adapters_cluster_redis.default.md#capturerejections)
- [defaultMaxListeners](adapters_cluster_redis.default.md#defaultmaxlisteners)
- [errorMonitor](adapters_cluster_redis.default.md#errormonitor)

### Accessors

- [glee](adapters_cluster_redis.default.md#glee)
- [instanceId](adapters_cluster_redis.default.md#instanceid)
- [serverName](adapters_cluster_redis.default.md#servername)
- [serverUrlExpanded](adapters_cluster_redis.default.md#serverurlexpanded)

### Methods

- [\_connect](adapters_cluster_redis.default.md#_connect)
- [\_send](adapters_cluster_redis.default.md#_send)
- [addListener](adapters_cluster_redis.default.md#addlistener)
- [connect](adapters_cluster_redis.default.md#connect)
- [deserializeMessage](adapters_cluster_redis.default.md#deserializemessage)
- [emit](adapters_cluster_redis.default.md#emit)
- [eventNames](adapters_cluster_redis.default.md#eventnames)
- [getMaxListeners](adapters_cluster_redis.default.md#getmaxlisteners)
- [listenerCount](adapters_cluster_redis.default.md#listenercount)
- [listeners](adapters_cluster_redis.default.md#listeners)
- [name](adapters_cluster_redis.default.md#name)
- [off](adapters_cluster_redis.default.md#off)
- [on](adapters_cluster_redis.default.md#on)
- [once](adapters_cluster_redis.default.md#once)
- [prependListener](adapters_cluster_redis.default.md#prependlistener)
- [prependOnceListener](adapters_cluster_redis.default.md#prependoncelistener)
- [rawListeners](adapters_cluster_redis.default.md#rawlisteners)
- [removeAllListeners](adapters_cluster_redis.default.md#removealllisteners)
- [removeListener](adapters_cluster_redis.default.md#removelistener)
- [send](adapters_cluster_redis.default.md#send)
- [serializeMessage](adapters_cluster_redis.default.md#serializemessage)
- [setMaxListeners](adapters_cluster_redis.default.md#setmaxlisteners)
- [getEventListeners](adapters_cluster_redis.default.md#geteventlisteners)
- [listenerCount](adapters_cluster_redis.default.md#listenercount-1)
- [on](adapters_cluster_redis.default.md#on-1)
- [once](adapters_cluster_redis.default.md#once-1)
- [setMaxListeners](adapters_cluster_redis.default.md#setmaxlisteners-1)

## Constructors

### constructor

• **new default**(`glee`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glee` | [`default`](lib_glee.default.md) |  |

#### Inherited from

[default](lib_cluster.default.md).[constructor](lib_cluster.default.md#constructor)

#### Defined in

[src/lib/cluster.ts:46](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L46)

## Properties

### \_channelName

• `Private` **\_channelName**: `string`

#### Defined in

[src/adapters/cluster/redis/index.ts:9](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L9)

___

### \_publisher

• `Private` **\_publisher**: `RedisClientType`<{ `bf`: { `ADD`: `__module` ; `EXISTS`: `__module` ; `INFO`: `__module` ; `INSERT`: `__module` ; `LOADCHUNK`: `__module` ; `MADD`: `__module` ; `MEXISTS`: `__module` ; `RESERVE`: `__module` ; `SCANDUMP`: `__module` ; `add`: `__module` ; `exists`: `__module` ; `info`: `__module` ; `insert`: `__module` ; `loadChunk`: `__module` ; `mAdd`: `__module` ; `mExists`: `__module` ; `reserve`: `__module` ; `scanDump`: `__module`  } ; `cf`: { `ADD`: `__module` ; `ADDNX`: `__module` ; `COUNT`: `__module` ; `DEL`: `__module` ; `EXISTS`: `__module` ; `INFO`: `__module` ; `INSERT`: `__module` ; `INSERTNX`: `__module` ; `LOADCHUNK`: `__module` ; `RESERVE`: `__module` ; `SCANDUMP`: `__module` ; `add`: `__module` ; `addNX`: `__module` ; `count`: `__module` ; `del`: `__module` ; `exists`: `__module` ; `info`: `__module` ; `insert`: `__module` ; `insertNX`: `__module` ; `loadChunk`: `__module` ; `reserve`: `__module` ; `scanDump`: `__module`  } ; `cms`: { `INCRBY`: `__module` ; `INFO`: `__module` ; `INITBYDIM`: `__module` ; `INITBYPROB`: `__module` ; `MERGE`: `__module` ; `QUERY`: `__module` ; `incrBy`: `__module` ; `info`: `__module` ; `initByDim`: `__module` ; `initByProb`: `__module` ; `merge`: `__module` ; `query`: `__module`  } ; `ft`: { `AGGREGATE`: `__module` ; `AGGREGATE_WITHCURSOR`: `__module` ; `ALIASADD`: `__module` ; `ALIASDEL`: `__module` ; `ALIASUPDATE`: `__module` ; `ALTER`: `__module` ; `CONFIG_GET`: `__module` ; `CONFIG_SET`: `__module` ; `CREATE`: `__module` ; `CURSOR_DEL`: `__module` ; `CURSOR_READ`: `__module` ; `DICTADD`: `__module` ; `DICTDEL`: `__module` ; `DICTDUMP`: `__module` ; `DROPINDEX`: `__module` ; `EXPLAIN`: `__module` ; `EXPLAINCLI`: `__module` ; `INFO`: `__module` ; `PROFILEAGGREGATE`: `__module` ; `PROFILESEARCH`: `__module` ; `SEARCH`: `__module` ; `SPELLCHECK`: `__module` ; `SUGADD`: `__module` ; `SUGDEL`: `__module` ; `SUGGET`: `__module` ; `SUGGET_WITHPAYLOADS`: `__module` ; `SUGGET_WITHSCORES`: `__module` ; `SUGGET_WITHSCORES_WITHPAYLOADS`: `__module` ; `SUGLEN`: `__module` ; `SYNDUMP`: `__module` ; `SYNUPDATE`: `__module` ; `TAGVALS`: `__module` ; `_LIST`: `__module` ; `_list`: `__module` ; `aggregate`: `__module` ; `aggregateWithCursor`: `__module` ; `aliasAdd`: `__module` ; `aliasDel`: `__module` ; `aliasUpdate`: `__module` ; `alter`: `__module` ; `configGet`: `__module` ; `configSet`: `__module` ; `create`: `__module` ; `cursorDel`: `__module` ; `cursorRead`: `__module` ; `dictAdd`: `__module` ; `dictDel`: `__module` ; `dictDump`: `__module` ; `dropIndex`: `__module` ; `explain`: `__module` ; `explainCli`: `__module` ; `info`: `__module` ; `profileAggregate`: `__module` ; `profileSearch`: `__module` ; `search`: `__module` ; `spellCheck`: `__module` ; `sugAdd`: `__module` ; `sugDel`: `__module` ; `sugGet`: `__module` ; `sugGetWithPayloads`: `__module` ; `sugGetWithScores`: `__module` ; `sugGetWithScoresWithPayloads`: `__module` ; `sugLen`: `__module` ; `synDump`: `__module` ; `synUpdate`: `__module` ; `tagVals`: `__module`  } ; `graph`: { `CONFIG_GET`: `__module` ; `CONFIG_SET`: `__module` ; `DELETE`: `__module` ; `EXPLAIN`: `__module` ; `LIST`: `__module` ; `PROFILE`: `__module` ; `QUERY`: `__module` ; `RO_QUERY`: `__module` ; `SLOWLOG`: `__module` ; `configGet`: `__module` ; `configSet`: `__module` ; `delete`: `__module` ; `explain`: `__module` ; `list`: `__module` ; `profile`: `__module` ; `query`: `__module` ; `roQuery`: `__module` ; `slowLog`: `__module`  } ; `json`: { `ARRAPPEND`: `__module` ; `ARRINDEX`: `__module` ; `ARRINSERT`: `__module` ; `ARRLEN`: `__module` ; `ARRPOP`: `__module` ; `ARRTRIM`: `__module` ; `DEBUG_MEMORY`: `__module` ; `DEL`: `__module` ; `FORGET`: `__module` ; `GET`: `__module` ; `MGET`: `__module` ; `NUMINCRBY`: `__module` ; `NUMMULTBY`: `__module` ; `OBJKEYS`: `__module` ; `OBJLEN`: `__module` ; `RESP`: `__module` ; `SET`: `__module` ; `STRAPPEND`: `__module` ; `STRLEN`: `__module` ; `TYPE`: `__module` ; `arrAppend`: `__module` ; `arrIndex`: `__module` ; `arrInsert`: `__module` ; `arrLen`: `__module` ; `arrPop`: `__module` ; `arrTrim`: `__module` ; `debugMemory`: `__module` ; `del`: `__module` ; `forget`: `__module` ; `get`: `__module` ; `mGet`: `__module` ; `numIncrBy`: `__module` ; `numMultBy`: `__module` ; `objKeys`: `__module` ; `objLen`: `__module` ; `resp`: `__module` ; `set`: `__module` ; `strAppend`: `__module` ; `strLen`: `__module` ; `type`: `__module`  } ; `tDigest`: { `ADD`: `__module` ; `BYRANK`: `__module` ; `BYREVRANK`: `__module` ; `CDF`: `__module` ; `CREATE`: `__module` ; `INFO`: `__module` ; `MAX`: `__module` ; `MERGE`: `__module` ; `MIN`: `__module` ; `QUANTILE`: `__module` ; `RANK`: `__module` ; `RESET`: `__module` ; `REVRANK`: `__module` ; `TRIMMED_MEAN`: `__module` ; `add`: `__module` ; `byRank`: `__module` ; `byRevRank`: `__module` ; `cdf`: `__module` ; `create`: `__module` ; `info`: `__module` ; `max`: `__module` ; `merge`: `__module` ; `min`: `__module` ; `quantile`: `__module` ; `rank`: `__module` ; `reset`: `__module` ; `revRank`: `__module` ; `trimmedMean`: `__module`  } ; `topK`: { `ADD`: `__module` ; `COUNT`: `__module` ; `INCRBY`: `__module` ; `INFO`: `__module` ; `LIST`: `__module` ; `LIST_WITHCOUNT`: `__module` ; `QUERY`: `__module` ; `RESERVE`: `__module` ; `add`: `__module` ; `count`: `__module` ; `incrBy`: `__module` ; `info`: `__module` ; `list`: `__module` ; `listWithCount`: `__module` ; `query`: `__module` ; `reserve`: `__module`  } ; `ts`: { `ADD`: `__module` ; `ALTER`: `__module` ; `CREATE`: `__module` ; `CREATERULE`: `__module` ; `DECRBY`: `__module` ; `DEL`: `__module` ; `DELETERULE`: `__module` ; `GET`: `__module` ; `INCRBY`: `__module` ; `INFO`: `__module` ; `INFO_DEBUG`: `__module` ; `MADD`: `__module` ; `MGET`: `__module` ; `MGET_WITHLABELS`: `__module` ; `MRANGE`: `__module` ; `MRANGE_WITHLABELS`: `__module` ; `MREVRANGE`: `__module` ; `MREVRANGE_WITHLABELS`: `__module` ; `QUERYINDEX`: `__module` ; `RANGE`: `__module` ; `REVRANGE`: `__module` ; `add`: `__module` ; `alter`: `__module` ; `create`: `__module` ; `createRule`: `__module` ; `decrBy`: `__module` ; `del`: `__module` ; `deleteRule`: `__module` ; `get`: `__module` ; `incrBy`: `__module` ; `info`: `__module` ; `infoDebug`: `__module` ; `mAdd`: `__module` ; `mGet`: `__module` ; `mGetWithLabels`: `__module` ; `mRange`: `__module` ; `mRangeWithLabels`: `__module` ; `mRevRange`: `__module` ; `mRevRangeWithLabels`: `__module` ; `queryIndex`: `__module` ; `range`: `__module` ; `revRange`: `__module`  }  } & `RedisModules`, `RedisFunctions`, `RedisScripts`\>

#### Defined in

[src/adapters/cluster/redis/index.ts:10](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L10)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](adapters_cluster_redis.default.md#capturerejectionsymbol)

#### Inherited from

[default](lib_cluster.default.md).[captureRejectionSymbol](lib_cluster.default.md#capturerejectionsymbol)

#### Defined in

node_modules/@types/node/events.d.ts:328

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

#### Inherited from

[default](lib_cluster.default.md).[captureRejections](lib_cluster.default.md#capturerejections)

#### Defined in

node_modules/@types/node/events.d.ts:333

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

[default](lib_cluster.default.md).[defaultMaxListeners](lib_cluster.default.md#defaultmaxlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:334

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](adapters_cluster_redis.default.md#errormonitor)

#### Inherited from

[default](lib_cluster.default.md).[errorMonitor](lib_cluster.default.md#errormonitor)

#### Defined in

node_modules/@types/node/events.d.ts:327

## Accessors

### glee

• `get` **glee**(): [`default`](lib_glee.default.md)

#### Returns

[`default`](lib_glee.default.md)

#### Inherited from

ClusterAdapter.glee

#### Defined in

[src/lib/cluster.ts:93](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L93)

___

### instanceId

• `get` **instanceId**(): `string`

#### Returns

`string`

#### Inherited from

ClusterAdapter.instanceId

#### Defined in

[src/lib/cluster.ts:105](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L105)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Inherited from

ClusterAdapter.serverName

#### Defined in

[src/lib/cluster.ts:97](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L97)

___

### serverUrlExpanded

• `get` **serverUrlExpanded**(): `string`

#### Returns

`string`

#### Inherited from

ClusterAdapter.serverUrlExpanded

#### Defined in

[src/lib/cluster.ts:101](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L101)

## Methods

### \_connect

▸ **_connect**(): `Promise`<[`default`](adapters_cluster_redis.default.md)\>

#### Returns

`Promise`<[`default`](adapters_cluster_redis.default.md)\>

#### Defined in

[src/adapters/cluster/redis/index.ts:24](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L24)

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

[src/adapters/cluster/redis/index.ts:67](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L67)

___

### addListener

▸ **addListener**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[addListener](lib_cluster.default.md#addlistener)

#### Defined in

node_modules/@types/node/events.d.ts:354

___

### connect

▸ **connect**(): `Promise`<[`default`](adapters_cluster_redis.default.md)\>

#### Returns

`Promise`<[`default`](adapters_cluster_redis.default.md)\>

#### Overrides

[default](lib_cluster.default.md).[connect](lib_cluster.default.md#connect)

#### Defined in

[src/adapters/cluster/redis/index.ts:16](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L16)

___

### deserializeMessage

▸ **deserializeMessage**(`serialized`): [`default`](lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serialized` | `string` |  |

#### Returns

[`default`](lib_message.default.md)

#### Inherited from

[default](lib_cluster.default.md).[deserializeMessage](lib_cluster.default.md#deserializemessage)

#### Defined in

[src/lib/cluster.ts:151](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L151)

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

[default](lib_cluster.default.md).[emit](lib_cluster.default.md#emit)

#### Defined in

node_modules/@types/node/events.d.ts:610

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

[default](lib_cluster.default.md).[eventNames](lib_cluster.default.md#eventnames)

#### Defined in

node_modules/@types/node/events.d.ts:669

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

[default](lib_cluster.default.md).[getMaxListeners](lib_cluster.default.md#getmaxlisteners)

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

[default](lib_cluster.default.md).[listenerCount](lib_cluster.default.md#listenercount)

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

[default](lib_cluster.default.md).[listeners](lib_cluster.default.md#listeners)

#### Defined in

node_modules/@types/node/events.d.ts:539

___

### name

▸ **name**(): `string`

#### Returns

`string`

#### Defined in

[src/adapters/cluster/redis/index.ts:12](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L12)

___

### off

▸ **off**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[off](lib_cluster.default.md#off)

#### Defined in

node_modules/@types/node/events.d.ts:499

___

### on

▸ **on**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[on](lib_cluster.default.md#on)

#### Defined in

node_modules/@types/node/events.d.ts:385

___

### once

▸ **once**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[once](lib_cluster.default.md#once)

#### Defined in

node_modules/@types/node/events.d.ts:414

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[prependListener](lib_cluster.default.md#prependlistener)

#### Defined in

node_modules/@types/node/events.d.ts:634

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` |  |
| `listener` | (...`args`: `any`[]) => `void` |  |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[prependOnceListener](lib_cluster.default.md#prependoncelistener)

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

[default](lib_cluster.default.md).[rawListeners](lib_cluster.default.md#rawlisteners)

#### Defined in

node_modules/@types/node/events.d.ts:569

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[removeAllListeners](lib_cluster.default.md#removealllisteners)

#### Defined in

node_modules/@types/node/events.d.ts:510

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[removeListener](lib_cluster.default.md#removelistener)

#### Defined in

node_modules/@types/node/events.d.ts:494

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

[default](lib_cluster.default.md).[send](lib_cluster.default.md#send)

#### Defined in

[src/adapters/cluster/redis/index.ts:20](https://github.com/asyncapi/glee/blob/2557652/src/adapters/cluster/redis/index.ts#L20)

___

### serializeMessage

▸ **serializeMessage**(`message`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](lib_message.default.md) |  |

#### Returns

`string`

#### Inherited from

[default](lib_cluster.default.md).[serializeMessage](lib_cluster.default.md#serializemessage)

#### Defined in

[src/lib/cluster.ts:131](https://github.com/asyncapi/glee/blob/2557652/src/lib/cluster.ts#L131)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`default`](adapters_cluster_redis.default.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`default`](adapters_cluster_redis.default.md)

#### Inherited from

[default](lib_cluster.default.md).[setMaxListeners](lib_cluster.default.md#setmaxlisteners)

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

[default](lib_cluster.default.md).[getEventListeners](lib_cluster.default.md#geteventlisteners)

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

[default](lib_cluster.default.md).[listenerCount](lib_cluster.default.md#listenercount-1)

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

[default](lib_cluster.default.md).[on](lib_cluster.default.md#on-1)

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

[default](lib_cluster.default.md).[once](lib_cluster.default.md#once-1)

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

[default](lib_cluster.default.md).[once](lib_cluster.default.md#once-1)

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

[default](lib_cluster.default.md).[setMaxListeners](lib_cluster.default.md#setmaxlisteners-1)

#### Defined in

node_modules/@types/node/events.d.ts:317
