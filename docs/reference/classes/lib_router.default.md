[@asyncapi/glee](../README.md) / [lib/router](../modules/lib_router.md) / default

# Class: default

[lib/router](../modules/lib_router.md).default

## Table of contents

### Constructors

- [constructor](lib_router.default.md#constructor)

### Properties

- [errorMiddlewares](lib_router.default.md#errormiddlewares)
- [middlewares](lib_router.default.md#middlewares)
- [outboundErrorMiddlewares](lib_router.default.md#outbounderrormiddlewares)
- [outboundMiddlewares](lib_router.default.md#outboundmiddlewares)

### Methods

- [\_addMiddlewares](lib_router.default.md#_addmiddlewares)
- [addErrorMiddlewares](lib_router.default.md#adderrormiddlewares)
- [addMiddlewares](lib_router.default.md#addmiddlewares)
- [addOutboundErrorMiddlewares](lib_router.default.md#addoutbounderrormiddlewares)
- [addOutboundMiddlewares](lib_router.default.md#addoutboundmiddlewares)
- [getErrorMiddlewares](lib_router.default.md#geterrormiddlewares)
- [getMiddlewares](lib_router.default.md#getmiddlewares)
- [getOutboundErrorMiddlewares](lib_router.default.md#getoutbounderrormiddlewares)
- [getOutboundMiddlewares](lib_router.default.md#getoutboundmiddlewares)
- [middlewaresToChannelMiddlewaresTuples](lib_router.default.md#middlewarestochannelmiddlewarestuples)
- [use](lib_router.default.md#use)
- [useOutbound](lib_router.default.md#useoutbound)

## Constructors

### constructor

• **new default**()

#### Defined in

[src/lib/router.ts:25](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L25)

## Properties

### errorMiddlewares

• `Private` **errorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:19](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L19)

___

### middlewares

• `Private` **middlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:17](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L17)

___

### outboundErrorMiddlewares

• `Private` **outboundErrorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:20](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L20)

___

### outboundMiddlewares

• `Private` **outboundMiddlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:18](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L18)

## Methods

### \_addMiddlewares

▸ `Private` **_addMiddlewares**(`target`, `middlewares`, `channel`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] |  |
| `middlewares` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] |  |
| `channel` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:122](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L122)

___

### addErrorMiddlewares

▸ **addErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] |  |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:159](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L159)

___

### addMiddlewares

▸ **addMiddlewares**(`middlewares`, `channel?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] |  |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:139](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L139)

___

### addOutboundErrorMiddlewares

▸ **addOutboundErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] |  |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:169](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L169)

___

### addOutboundMiddlewares

▸ **addOutboundMiddlewares**(`middlewares`, `channel?`): `void`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] |  |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:149](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L149)

___

### getErrorMiddlewares

▸ **getErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:102](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L102)

___

### getMiddlewares

▸ **getMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:86](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L86)

___

### getOutboundErrorMiddlewares

▸ **getOutboundErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:110](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L110)

___

### getOutboundMiddlewares

▸ **getOutboundMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:94](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L94)

___

### middlewaresToChannelMiddlewaresTuples

▸ `Private` **middlewaresToChannelMiddlewaresTuples**(`channel`, `...middlewares`): [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` \| [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware) |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

[`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:73](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L73)

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

[src/lib/router.ts:39](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L39)

▸ **use**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:40](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L40)

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

[src/lib/router.ts:59](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L59)

▸ **useOutbound**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:60](https://github.com/asyncapi/glee/blob/2557652/src/lib/router.ts#L60)
