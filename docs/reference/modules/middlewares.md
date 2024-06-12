[@asyncapi/glee](../README.md) / middlewares

# Module: middlewares

## Table of contents

### Type Aliases

- [ErrorMiddleware](middlewares.md#errormiddleware)
- [Middleware](middlewares.md#middleware)
- [MiddlewareCallback](middlewares.md#middlewarecallback)

## Type Aliases

### ErrorMiddleware

Ƭ **ErrorMiddleware**: (`error`: `Error`, `message`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

#### Type declaration

▸ (`error`, `message`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `message` | [`default`](../classes/lib_message.default.md) |
| `next` | [`MiddlewareCallback`](middlewares.md#middlewarecallback) |

##### Returns

`void`

#### Defined in

[src/middlewares/index.d.ts:7](https://github.com/asyncapi/glee/blob/0f07e45/src/middlewares/index.d.ts#L7)

___

### Middleware

Ƭ **Middleware**: (`message`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

#### Type declaration

▸ (`message`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |
| `next` | [`MiddlewareCallback`](middlewares.md#middlewarecallback) |

##### Returns

`void`

#### Defined in

[src/middlewares/index.d.ts:3](https://github.com/asyncapi/glee/blob/0f07e45/src/middlewares/index.d.ts#L3)

___

### MiddlewareCallback

Ƭ **MiddlewareCallback**: (`error?`: `Error`, `message?`: [`default`](../classes/lib_message.default.md)) => `void`

#### Type declaration

▸ (`error?`, `message?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |
| `message?` | [`default`](../classes/lib_message.default.md) |

##### Returns

`void`

#### Defined in

[src/middlewares/index.d.ts:12](https://github.com/asyncapi/glee/blob/0f07e45/src/middlewares/index.d.ts#L12)
