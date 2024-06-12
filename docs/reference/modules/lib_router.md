[@asyncapi/glee](../README.md) / lib/router

# Module: lib/router

## Table of contents

### Classes

- [default](../classes/lib_router.default.md)

### Type Aliases

- [ChannelErrorMiddlewareTuple](lib_router.md#channelerrormiddlewaretuple)
- [ChannelMiddlewareTuple](lib_router.md#channelmiddlewaretuple)
- [GenericChannelMiddlewareTuple](lib_router.md#genericchannelmiddlewaretuple)
- [GenericMiddleware](lib_router.md#genericmiddleware)

## Type Aliases

### ChannelErrorMiddlewareTuple

Ƭ **ChannelErrorMiddlewareTuple**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `fn` | [`ErrorMiddleware`](middlewares.md#errormiddleware) |

#### Defined in

[src/lib/router.ts:8](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/router.ts#L8)

___

### ChannelMiddlewareTuple

Ƭ **ChannelMiddlewareTuple**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `fn` | [`Middleware`](middlewares.md#middleware) |

#### Defined in

[src/lib/router.ts:3](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/router.ts#L3)

___

### GenericChannelMiddlewareTuple

Ƭ **GenericChannelMiddlewareTuple**: [`ChannelMiddlewareTuple`](lib_router.md#channelmiddlewaretuple) \| [`ChannelErrorMiddlewareTuple`](lib_router.md#channelerrormiddlewaretuple)

#### Defined in

[src/lib/router.ts:14](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/router.ts#L14)

___

### GenericMiddleware

Ƭ **GenericMiddleware**: [`Middleware`](middlewares.md#middleware) \| [`ErrorMiddleware`](middlewares.md#errormiddleware)

#### Defined in

[src/lib/router.ts:13](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/router.ts#L13)
