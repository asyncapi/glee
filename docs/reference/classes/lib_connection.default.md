[@asyncapi/glee](../README.md) / [lib/connection](../modules/lib_connection.md) / default

# Class: default

[lib/connection](../modules/lib_connection.md).default

## Table of contents

### Constructors

- [constructor](lib_connection.default.md#constructor)

### Properties

- [\_AsyncAPIServer](lib_connection.default.md#_asyncapiserver)
- [\_channels](lib_connection.default.md#_channels)
- [\_parsedAsyncAPI](lib_connection.default.md#_parsedasyncapi)
- [\_rawConnection](lib_connection.default.md#_rawconnection)
- [\_serverName](lib_connection.default.md#_servername)

### Accessors

- [AsyncAPIServer](lib_connection.default.md#asyncapiserver)
- [channels](lib_connection.default.md#channels)
- [parsedAsyncAPI](lib_connection.default.md#parsedasyncapi)
- [rawConnection](lib_connection.default.md#rawconnection)
- [serverName](lib_connection.default.md#servername)

### Methods

- [getRaw](lib_connection.default.md#getraw)
- [hasChannel](lib_connection.default.md#haschannel)

## Constructors

### constructor

• **new default**(`options`)

Instantiates a Glee connection.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `IGleeConnectionConstructor` |

#### Defined in

[src/lib/connection.ts:28](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L28)

## Properties

### \_AsyncAPIServer

• `Private` **\_AsyncAPIServer**: `ServerInterface`

#### Defined in

[src/lib/connection.ts:15](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L15)

___

### \_channels

• `Private` **\_channels**: `string`[]

#### Defined in

[src/lib/connection.ts:13](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L13)

___

### \_parsedAsyncAPI

• `Private` **\_parsedAsyncAPI**: `AsyncAPIDocumentInterface`

#### Defined in

[src/lib/connection.ts:16](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L16)

___

### \_rawConnection

• `Private` **\_rawConnection**: `any`

#### Defined in

[src/lib/connection.ts:12](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L12)

___

### \_serverName

• `Private` **\_serverName**: `string`

#### Defined in

[src/lib/connection.ts:14](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L14)

## Accessors

### AsyncAPIServer

• `get` **AsyncAPIServer**(): `ServerInterface`

#### Returns

`ServerInterface`

#### Defined in

[src/lib/connection.ts:54](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L54)

___

### channels

• `get` **channels**(): `string`[]

#### Returns

`string`[]

#### Defined in

[src/lib/connection.ts:46](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L46)

___

### parsedAsyncAPI

• `get` **parsedAsyncAPI**(): `AsyncAPIDocumentInterface`

#### Returns

`AsyncAPIDocumentInterface`

#### Defined in

[src/lib/connection.ts:58](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L58)

___

### rawConnection

• `get` **rawConnection**(): `any`

#### Returns

`any`

#### Defined in

[src/lib/connection.ts:42](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L42)

___

### serverName

• `get` **serverName**(): `string`

#### Returns

`string`

#### Defined in

[src/lib/connection.ts:50](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L50)

## Methods

### getRaw

▸ **getRaw**(): `any`

Returns the real connection object.

#### Returns

`any`

#### Defined in

[src/lib/connection.ts:77](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L77)

___

### hasChannel

▸ **hasChannel**(`channelName`): `boolean`

Checks whether a channel is associated with this connection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelName` | `string` | The name of the channel. |

#### Returns

`boolean`

#### Defined in

[src/lib/connection.ts:68](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/connection.ts#L68)
