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
- [use](lib_router.default.md#use)
- [useOutbound](lib_router.default.md#useoutbound)

## Constructors

### constructor

• **new default**()

Instantiates a GleeRouter.

#### Defined in

[src/lib/router.ts:25](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L25)

## Properties

### errorMiddlewares

• `Private` **errorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:19](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L19)

___

### middlewares

• `Private` **middlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:17](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L17)

___

### outboundErrorMiddlewares

• `Private` **outboundErrorMiddlewares**: [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:20](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L20)

___

### outboundMiddlewares

• `Private` **outboundMiddlewares**: [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:18](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L18)

## Methods

### \_addMiddlewares

▸ `Private` **_addMiddlewares**(`target`, `middlewares`, `channel`): `void`

Adds a normalized middleware to a target collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] | The target collection. |
| `middlewares` | [`GenericChannelMiddlewareTuple`](../modules/lib_router.md#genericchannelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:123](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L123)

___

### addErrorMiddlewares

▸ **addErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

Adds a normalized middleware to the inbound error middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:160](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L160)

___

### addMiddlewares

▸ **addMiddlewares**(`middlewares`, `channel?`): `void`

Adds a normalized middleware to the inbound middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:140](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L140)

___

### addOutboundErrorMiddlewares

▸ **addOutboundErrorMiddlewares**(`errorMiddlewares`, `channel?`): `void`

Adds a normalized middleware to the outbound error middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMiddlewares` | [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:170](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L170)

___

### addOutboundMiddlewares

▸ **addOutboundMiddlewares**(`middlewares`, `channel?`): `void`

Adds a normalized middleware to the outbound middlewares collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `middlewares` | [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[] | The middlewares to add to the collection. |
| `channel?` | `string` | - |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:150](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L150)

___

### getErrorMiddlewares

▸ **getErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

Returns all the inbound error middlewares.

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:103](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L103)

___

### getMiddlewares

▸ **getMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

Returns all the inbound middlewares.

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:87](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L87)

___

### getOutboundErrorMiddlewares

▸ **getOutboundErrorMiddlewares**(): [`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

Returns all the outbound error middlewares.

#### Returns

[`ChannelErrorMiddlewareTuple`](../modules/lib_router.md#channelerrormiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:111](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L111)

___

### getOutboundMiddlewares

▸ **getOutboundMiddlewares**(): [`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

Returns all the outbound middlewares.

#### Returns

[`ChannelMiddlewareTuple`](../modules/lib_router.md#channelmiddlewaretuple)[]

#### Defined in

[src/lib/router.ts:95](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L95)

___

### use

▸ **use**(...`middlewares`): `void`

Use a middleware for inbound messages. Please, note that when passing a GleeRouter as a param,
this function will make use of inbound and outbound middlewares.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:39](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L39)

▸ **use**(`channel`, ...`middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:40](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L40)

___

### useOutbound

▸ **useOutbound**(...`middlewares`): `void`

Use a middleware for outbound messages.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:64](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L64)

▸ **useOutbound**(`channel`, ...`middlewares`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `...middlewares` | [`GenericMiddleware`](../modules/lib_router.md#genericmiddleware)[] |

#### Returns

`void`

#### Defined in

[src/lib/router.ts:65](https://github.com/fmvilas/glee/blob/5924dda/src/lib/router.ts#L65)
