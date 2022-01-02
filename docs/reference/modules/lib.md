[@asyncapi/glee](../README.md) / lib

# Module: lib

## Table of contents

### Type aliases

- [GleeConfig](lib.md#gleeconfig)
- [GleeFunction](lib.md#gleefunction)
- [GleeFunctionEvent](lib.md#gleefunctionevent)
- [GleeFunctionReturn](lib.md#gleefunctionreturn)
- [GleeFunctionReturnBroadcast](lib.md#gleefunctionreturnbroadcast)
- [GleeFunctionReturnReply](lib.md#gleefunctionreturnreply)
- [GleeFunctionReturnSend](lib.md#gleefunctionreturnsend)
- [WebSocketServerType](lib.md#websocketservertype)

## Type aliases

### GleeConfig

Ƭ **GleeConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `websocket?` | `Object` |
| `websocket.adapter?` | [`WebSocketServerType`](lib.md#websocketservertype) \| typeof [`default`](../classes/lib_adapter.default.md) |
| `websocket.httpServer?` | `any` |
| `websocket.port?` | `number` |

#### Defined in

[src/lib/index.d.ts:8](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L8)

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

[src/lib/index.d.ts:41](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L41)

___

### GleeFunctionEvent

Ƭ **GleeFunctionEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `connection?` | [`default`](../classes/lib_connection.default.md) |
| `glee` | [`default`](../classes/lib_glee.default.md) |
| `headers?` | `Object` |
| `payload?` | `any` |
| `serverName` | `string` |

#### Defined in

[src/lib/index.d.ts:22](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L22)

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

[src/lib/index.d.ts:16](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L16)

___

### GleeFunctionReturnBroadcast

Ƭ **GleeFunctionReturnBroadcast**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:39](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L39)

___

### GleeFunctionReturnReply

Ƭ **GleeFunctionReturnReply**: [`GleeFunctionReturnSend`](lib.md#gleefunctionreturnsend)

#### Defined in

[src/lib/index.d.ts:38](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L38)

___

### GleeFunctionReturnSend

Ƭ **GleeFunctionReturnSend**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | `string` |
| `headers?` | `Object` |
| `payload?` | `any` |
| `server?` | `string` |

#### Defined in

[src/lib/index.d.ts:31](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L31)

___

### WebSocketServerType

Ƭ **WebSocketServerType**: ``"native"`` \| ``"socket.io"``

#### Defined in

[src/lib/index.d.ts:6](https://github.com/fmvilas/glee/blob/5924dda/src/lib/index.d.ts#L6)
