[@asyncapi/glee](../README.md) / lib

# Module: lib

## Table of contents

### Type aliases

- [GleeClusterAdapterConfig](lib.md#gleeclusteradapterconfig)
- [GleeConfig](lib.md#gleeconfig)
- [GleeFunction](lib.md#gleefunction)
- [GleeFunctionEvent](lib.md#gleefunctionevent)
- [GleeFunctionReturn](lib.md#gleefunctionreturn)
- [GleeFunctionReturnBroadcast](lib.md#gleefunctionreturnbroadcast)
- [GleeFunctionReturnReply](lib.md#gleefunctionreturnreply)
- [GleeFunctionReturnSend](lib.md#gleefunctionreturnsend)
- [WebSocketServerType](lib.md#websocketservertype)

## Type aliases

### GleeClusterAdapterConfig

Ƭ **GleeClusterAdapterConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `adapter?` | `string` \| typeof [`default`](../classes/lib_cluster.default.md) |
| `name?` | `string` |
| `url` | `string` |

#### Defined in

[src/lib/index.d.ts:8](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L8)

___

### GleeConfig

Ƭ **GleeConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cluster?` | [`GleeClusterAdapterConfig`](lib.md#gleeclusteradapterconfig) |
| `websocket?` | { `adapter?`: [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) ; `httpServer?`: `any` ; `port?`: `number`  } |
| `websocket.adapter?` | [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) |
| `websocket.httpServer?` | `any` |
| `websocket.port?` | `number` |

#### Defined in

[src/lib/index.d.ts:14](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L14)

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

[src/lib/index.d.ts:48](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L48)

___

### GleeFunctionEvent

Ƭ **GleeFunctionEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `connection?` | [`default`](../classes/lib_connection.default.md) |
| `glee` | [`default`](../classes/lib_glee.default.md) |
| `headers?` | { [key: string]: `string`;  } |
| `payload?` | `any` |
| `serverName` | `string` |

#### Defined in

[src/lib/index.d.ts:29](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L29)

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

[src/lib/index.d.ts:23](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L23)

___

### GleeFunctionReturnBroadcast

Ƭ **GleeFunctionReturnBroadcast**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:46](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L46)

___

### GleeFunctionReturnReply

Ƭ **GleeFunctionReturnReply**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:45](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L45)

___

### GleeFunctionReturnSend

Ƭ **GleeFunctionReturnSend**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `headers?` | { [key: string]: `string`;  } |
| `payload?` | `any` |
| `server?` | `string` |

#### Defined in

[src/lib/index.d.ts:38](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L38)

___

### WebSocketServerType

Ƭ **WebSocketServerType**: ``"native"`` \| ``"socket.io"``

#### Defined in

[src/lib/index.d.ts:6](https://github.com/asyncapi/glee/blob/90f10a0/src/lib/index.d.ts#L6)
