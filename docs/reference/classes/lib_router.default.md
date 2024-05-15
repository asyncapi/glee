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

Instantiates a GleeRouter.

#### Defined in

[src/lib/router.ts:27](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L27)

## Properties

### errorMiddlewares

• `Private` **errorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:21](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L21)

___

### middlewares

• `Private` **middlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:19](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L19)

___

### outboundErrorMiddlewares

• `Private` **outboundErrorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:22](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L22)

___

### outboundMiddlewares

• `Private` **outboundMiddlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:20](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L20)

## Methods

### \_addMiddlewares

▸ `Private` **_addMiddlewares**(`target`, `middlewares`, `channel?`): `void`

Adds a normalized middleware to a target collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] | The target collection. |
| `middlewares` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | The scope channel. |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:140](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L140)

___

### addErrorMiddlewares

▸ **addErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

Adds a normalized middleware to the inbound error middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | The scope channel. |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:186](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L186)

___

### addMiddlewares

▸ **addMiddlewares**(`middlewares`, `channel?`): `void`

Adds a normalized middleware to the inbound middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | The scope channel. |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:163](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L163)

___

### addOutboundErrorMiddlewares

▸ **addOutboundErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

Adds a normalized middleware to the outbound error middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | The scope channel. |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:199](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L199)

___

### addOutboundMiddlewares

▸ **addOutboundMiddlewares**(`middlewares`, `channel?`): `void`

Adds a normalized middleware to the outbound middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | The scope channel. |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:173](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L173)

___

### getErrorMiddlewares

▸ **getErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

Returns all the inbound error middlewares.

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:120](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L120)

___

### getMiddlewares

▸ **getMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

Returns all the inbound middlewares.

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:104](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L104)

___

### getOutboundErrorMiddlewares

▸ **getOutboundErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

Returns all the outbound error middlewares.

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:128](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L128)

___

### getOutboundMiddlewares

▸ **getOutboundMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

Returns all the outbound middlewares.

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:112](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L112)

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

[src/lib/router.ts:83](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L83)

___

### use

▸ **use**(`...middlewares`): `void`

Use a middleware for inbound messages. Please, note that when passing a GleeRouter as a param,
this function will make use of inbound and outbound middlewares.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:41](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L41)

▸ **use**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:42](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L42)

___

### useOutbound

▸ **useOutbound**(`...middlewares`): `void`

Use a middleware for outbound messages.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:65](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L65)

▸ **useOutbound**(`channel`, `...middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:66](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/router.ts#L66)
