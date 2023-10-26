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
- [AuthProps](lib.md#authprops)
- [CoreGleeConfig](lib.md#coregleeconfig)
- [GleeAuthFunction](lib.md#gleeauthfunction)
- [GleeAuthFunctionEvent](lib.md#gleeauthfunctionevent)
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
- [WsHttpAuth](lib.md#wshttpauth)

## Type Aliases

### AuthFunction

Ƭ **AuthFunction**<`T`\>: (`{
  serverName,
  parsedAsyncAPI,
}`: { `parsedAsyncAPI`: `AsyncAPIDocument` ; `serverName`: `string`  }) => `Promise`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`{
  serverName,
  parsedAsyncAPI,
}`): `Promise`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `{
  serverName,
  parsedAsyncAPI,
}` | `Object` |
| `{
  serverName,
  parsedAsyncAPI,
}.parsedAsyncAPI` | `AsyncAPIDocument` |
| `{
  serverName,
  parsedAsyncAPI,
}.serverName` | `string` |

##### Returns

`Promise`<`T`\>

#### Defined in

[src/lib/index.d.ts:11](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L11)

___

### AuthProps

Ƭ **AuthProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getAPIKeys` | () => `string` |
| `getCert` | () => `string` |
| `getHttpAPIKeys` | (`name`: `string`) => `string` |
| `getOauthToken` | () => `string` |
| `getToken` | () => `string` |
| `getUserPass` | () => { `password`: `string` ; `username`: `string`  } |

#### Defined in

[src/lib/index.d.ts:38](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L38)

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

[src/lib/index.d.ts:98](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L98)

___

### GleeAuthFunction

Ƭ **GleeAuthFunction**: (`event`: [`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent)) => `Promise`<[`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent)\>

#### Type declaration

▸ (`event`): `Promise`<[`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent) |

##### Returns

`Promise`<[`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent)\>

#### Defined in

[src/lib/index.d.ts:153](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L153)

___

### GleeAuthFunctionEvent

Ƭ **GleeAuthFunctionEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authProps` | [`AuthProps`](lib.md#authprops) |
| `doc` | `any` |
| `done` | `any` |
| `glee` | [`default`](../classes/lib_glee.default.md) |
| `serverName` | `string` |

#### Defined in

[src/lib/index.d.ts:130](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L130)

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

[src/lib/index.d.ts:61](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L61)

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

[src/lib/index.d.ts:105](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L105)

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

[src/lib/index.d.ts:149](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L149)

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

[src/lib/index.d.ts:120](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L120)

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

[src/lib/index.d.ts:114](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L114)

___

### GleeFunctionReturnBroadcast

Ƭ **GleeFunctionReturnBroadcast**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:147](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L147)

___

### GleeFunctionReturnReply

Ƭ **GleeFunctionReturnReply**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:146](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L146)

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

[src/lib/index.d.ts:138](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L138)

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

[src/lib/index.d.ts:79](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L79)

___

### HttpServerType

Ƭ **HttpServerType**: ``"native"``

#### Defined in

[src/lib/index.d.ts:8](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L8)

___

### KafkaAdapterConfig

Ƭ **KafkaAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:94](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L94)

___

### MqttAdapterConfig

Ƭ **MqttAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:90](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L90)

___

### QueryParam

Ƭ **QueryParam**: { `[key: string]`: `string`;  } \| { `[key: string]`: `string`[];  }

#### Defined in

[src/lib/index.d.ts:9](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L9)

___

### WebSocketServerType

Ƭ **WebSocketServerType**: ``"native"`` \| ``"socket.io"``

#### Defined in

[src/lib/index.d.ts:7](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L7)

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

[src/lib/index.d.ts:67](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L67)

___

### WsHttpAuth

Ƭ **WsHttpAuth**: [`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md) \| [`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md)

#### Defined in

[src/lib/index.d.ts:50](https://github.com/asyncapi/glee/blob/100883e/src/lib/index.d.ts#L50)
