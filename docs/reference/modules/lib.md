[@asyncapi/glee](../README.md) / lib

# Module: lib

## Table of contents

### Interfaces

- [HttpAuthConfig](../interfaces/lib.HttpAuthConfig.md)
- [KafkaAuthConfig](../interfaces/lib.KafkaAuthConfig.md)
- [MqttAuthConfig](../interfaces/lib.MqttAuthConfig.md)
- [WsAuthConfig](../interfaces/lib.WsAuthConfig.md)

### Type Aliases

- [AuthFunction](lib.md#authfunction)
- [CoreGleeConfig](lib.md#coregleeconfig)
- [GleeClusterAdapterConfig](lib.md#gleeclusteradapterconfig)
- [GleeConfig](lib.md#gleeconfig)
- [GleeFunction](lib.md#gleefunction)
- [GleeFunctionEvent](lib.md#gleefunctionevent)
- [GleeFunctionReturn](lib.md#gleefunctionreturn)
- [GleeFunctionReturnBroadcast](lib.md#gleefunctionreturnbroadcast)
- [GleeFunctionReturnReply](lib.md#gleefunctionreturnreply)
- [GleeFunctionReturnSend](lib.md#gleefunctionreturnsend)
- [HttpAdapterConfig](lib.md#httpadapterconfig)
- [HttpServerType](lib.md#httpservertype)
- [KafkaAdapterConfig](lib.md#kafkaadapterconfig)
- [MqttAdapterConfig](lib.md#mqttadapterconfig)
- [QueryParam](lib.md#queryparam)
- [WebSocketServerType](lib.md#websocketservertype)
- [WebsocketAdapterConfig](lib.md#websocketadapterconfig)

## Type Aliases

### AuthFunction

Ƭ **AuthFunction**<`T`\>: (`{serverName, parsedAsyncAPI}`: { `parsedAsyncAPI`: `AsyncAPIDocument` ; `serverName`: `string`  }) => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`{serverName, parsedAsyncAPI}`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `{serverName, parsedAsyncAPI}` | `Object` |
| `{serverName, parsedAsyncAPI}.parsedAsyncAPI` | `AsyncAPIDocument` |
| `{serverName, parsedAsyncAPI}.serverName` | `string` |

##### Returns

`Promise`<`T`\>

#### Defined in

[src/lib/index.d.ts:11](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L11)

___

### CoreGleeConfig

Ƭ **CoreGleeConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `asyncapiFilePath?` | `string` |
| `functionsDir?` | `string` |
| `gleeDir?` | `string` |
| `lifecycleDir?` | `string` |

#### Defined in

[src/lib/index.d.ts:74](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L74)

___

### GleeClusterAdapterConfig

Ƭ **GleeClusterAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adapter?` | `string` \| typeof [`default`](../classes/lib_cluster.default.md) |
| `name?` | `string` |
| `url` | `string` |

#### Defined in

[src/lib/index.d.ts:37](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L37)

___

### GleeConfig

Ƭ **GleeConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cluster?` | [`GleeClusterAdapterConfig`](lib.md#gleeclusteradapterconfig) |
| `glee?` | [`CoreGleeConfig`](lib.md#coregleeconfig) |
| `http?` | [`HttpAdapterConfig`](lib.md#httpadapterconfig) |
| `kafka?` | [`KafkaAdapterConfig`](lib.md#kafkaadapterconfig) |
| `mqtt?` | [`MqttAdapterConfig`](lib.md#mqttadapterconfig) |
| `ws?` | [`WebsocketAdapterConfig`](lib.md#websocketadapterconfig) |

#### Defined in

[src/lib/index.d.ts:81](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L81)

___

### GleeFunction

Ƭ **GleeFunction**: (`event`: [`GleeFunctionEvent`](lib.md#gleefunctionevent)) => `Promise`<[`GleeFunctionReturn`](lib.md#gleefunctionreturn)\>

#### Type declaration

▸ (`event`): `Promise`<[`GleeFunctionReturn`](lib.md#gleefunctionreturn)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`GleeFunctionEvent`](lib.md#gleefunctionevent) |

##### Returns

`Promise`<[`GleeFunctionReturn`](lib.md#gleefunctionreturn)\>

#### Defined in

[src/lib/index.d.ts:117](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L117)

___

### GleeFunctionEvent

Ƭ **GleeFunctionEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `connection?` | [`default`](../classes/lib_connection.default.md) |
| `glee` | [`default`](../classes/lib_glee.default.md) |
| `headers?` | { `[key: string]`: `string`;  } |
| `payload?` | `any` |
| `query?` | [`QueryParam`](lib.md#queryparam) |
| `serverName` | `string` |

#### Defined in

[src/lib/index.d.ts:96](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L96)

___

### GleeFunctionReturn

Ƭ **GleeFunctionReturn**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `broadcast?` | [`GleeFunctionReturnBroadcast`](lib.md#gleefunctionreturnbroadcast)[] |
| `reply?` | [`GleeFunctionReturnReply`](lib.md#gleefunctionreturnreply)[] |
| `send?` | [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)[] |

#### Defined in

[src/lib/index.d.ts:90](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L90)

___

### GleeFunctionReturnBroadcast

Ƭ **GleeFunctionReturnBroadcast**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:115](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L115)

___

### GleeFunctionReturnReply

Ƭ **GleeFunctionReturnReply**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:114](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L114)

___

### GleeFunctionReturnSend

Ƭ **GleeFunctionReturnSend**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `headers?` | { `[key: string]`: `string`;  } |
| `payload?` | `any` |
| `query?` | [`QueryParam`](lib.md#queryparam) |
| `server?` | `string` |

#### Defined in

[src/lib/index.d.ts:106](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L106)

___

### HttpAdapterConfig

Ƭ **HttpAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client?` | { `auth?`: [`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md)\> ; `body?`: `any` ; `query?`: [`QueryParam`](lib.md#queryparam)  } |
| `client.auth?` | [`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md)\> |
| `client.body?` | `any` |
| `client.query?` | [`QueryParam`](lib.md#queryparam) |
| `server` | { `httpServer?`: `any` ; `port?`: `number`  } |
| `server.httpServer?` | `any` |
| `server.port?` | `number` |

#### Defined in

[src/lib/index.d.ts:55](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L55)

___

### HttpServerType

Ƭ **HttpServerType**: ``"native"``

#### Defined in

[src/lib/index.d.ts:8](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L8)

___

### KafkaAdapterConfig

Ƭ **KafkaAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:70](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L70)

___

### MqttAdapterConfig

Ƭ **MqttAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:66](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L66)

___

### QueryParam

Ƭ **QueryParam**: { `[key: string]`: `string`;  } \| { `[key: string]`: `string`[];  }

#### Defined in

[src/lib/index.d.ts:9](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L9)

___

### WebSocketServerType

Ƭ **WebSocketServerType**: ``"native"`` \| ``"socket.io"``

#### Defined in

[src/lib/index.d.ts:7](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L7)

___

### WebsocketAdapterConfig

Ƭ **WebsocketAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `client?` | { `auth?`: [`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md)\> ; `query?`: `any`  } |
| `client.auth?` | [`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md)\> |
| `client.query?` | `any` |
| `server?` | { `adapter?`: [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) ; `httpServer?`: `any` ; `port?`: `number`  } |
| `server.adapter?` | [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) |
| `server.httpServer?` | `any` |
| `server.port?` | `number` |

#### Defined in

[src/lib/index.d.ts:43](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/index.d.ts#L43)
