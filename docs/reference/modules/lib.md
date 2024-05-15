[@asyncapi/glee](../README.md) / lib

# Module: lib

## Table of contents

### Interfaces

- [Authenticatable](../interfaces/lib.Authenticatable.md)
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
- [GleeLifecycleEvent](lib.md#gleelifecycleevent)
- [Headers](lib.md#headers)
- [HttpAdapterConfig](lib.md#httpadapterconfig)
- [HttpServerType](lib.md#httpservertype)
- [KafkaAdapterConfig](lib.md#kafkaadapterconfig)
- [Log](lib.md#log)
- [LogsConfig](lib.md#logsconfig)
- [MqttAdapterConfig](lib.md#mqttadapterconfig)
- [QueryParam](lib.md#queryparam)
- [WebSocketServerType](lib.md#websocketservertype)
- [WebsocketAdapterConfig](lib.md#websocketadapterconfig)
- [WebsocketServerAdapterConfig](lib.md#websocketserveradapterconfig)
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

[src/lib/index.d.ts:12](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L12)

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

[src/lib/index.d.ts:39](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L39)

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
| `logs?` | [`LogsConfig`](lib.md#logsconfig) |

#### Defined in

[src/lib/index.d.ts:103](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L103)

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

[src/lib/index.d.ts:162](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L162)

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

[src/lib/index.d.ts:139](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L139)

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

[src/lib/index.d.ts:62](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L62)

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

[src/lib/index.d.ts:111](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L111)

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

[src/lib/index.d.ts:158](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L158)

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
| `request` | [`default`](../classes/lib_message.default.md) |
| `serverName` | `string` |

#### Defined in

[src/lib/index.d.ts:126](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L126)

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

[src/lib/index.d.ts:120](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L120)

___

### GleeFunctionReturnBroadcast

Ƭ **GleeFunctionReturnBroadcast**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:156](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L156)

___

### GleeFunctionReturnReply

Ƭ **GleeFunctionReturnReply**: `Omit`<[`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend), ``"channel"`` \| ``"server"``\>

#### Defined in

[src/lib/index.d.ts:155](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L155)

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

[src/lib/index.d.ts:147](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L147)

___

### GleeLifecycleEvent

Ƭ **GleeLifecycleEvent**: `Omit`<[`GleeFunctionEvent`](lib.md#gleefunctionevent), ``"request"``\>

#### Defined in

[src/lib/index.d.ts:137](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L137)

___

### Headers

Ƭ **Headers**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/lib/index.d.ts:166](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L166)

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

[src/lib/index.d.ts:78](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L78)

___

### HttpServerType

Ƭ **HttpServerType**: ``"native"``

#### Defined in

[src/lib/index.d.ts:9](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L9)

___

### KafkaAdapterConfig

Ƭ **KafkaAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`KafkaAuthConfig`](../interfaces/lib.KafkaAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:93](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L93)

___

### Log

Ƭ **Log**: ``"channel-only"`` \| ``"none"``

#### Defined in

[src/lib/index.d.ts:96](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L96)

___

### LogsConfig

Ƭ **LogsConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `incoming` | [`Log`](lib.md#log) |
| `outgoing` | [`Log`](lib.md#log) |

#### Defined in

[src/lib/index.d.ts:98](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L98)

___

### MqttAdapterConfig

Ƭ **MqttAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth?` | [`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md) \| [`AuthFunction`](lib.md#authfunction)<[`MqttAuthConfig`](../interfaces/lib.MqttAuthConfig.md)\> |

#### Defined in

[src/lib/index.d.ts:89](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L89)

___

### QueryParam

Ƭ **QueryParam**: { `[key: string]`: `string`;  } \| { `[key: string]`: `string`[];  }

#### Defined in

[src/lib/index.d.ts:10](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L10)

___

### WebSocketServerType

Ƭ **WebSocketServerType**: ``"native"`` \| ``"socket.io"``

#### Defined in

[src/lib/index.d.ts:8](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L8)

___

### WebsocketAdapterConfig

Ƭ **WebsocketAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `server?` | [`WebsocketServerAdapterConfig`](lib.md#websocketserveradapterconfig) |

#### Defined in

[src/lib/index.d.ts:74](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L74)

___

### WebsocketServerAdapterConfig

Ƭ **WebsocketServerAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adapter?` | [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) |
| `httpServer?` | `any` |
| `port?` | `number` |

#### Defined in

[src/lib/index.d.ts:68](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L68)

___

### WsHttpAuth

Ƭ **WsHttpAuth**: [`WsAuthConfig`](../interfaces/lib.WsAuthConfig.md) \| [`HttpAuthConfig`](../interfaces/lib.HttpAuthConfig.md)

#### Defined in

[src/lib/index.d.ts:51](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/index.d.ts#L51)
