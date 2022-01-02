[@asyncapi/glee](../README.md) / middlewares

# Module: middlewares

## Table of contents

### Type aliases

- [ErrorMiddleware](middlewares.md#errormiddleware)
- [Middleware](middlewares.md#middleware)

## Type aliases

### ErrorMiddleware

Ƭ **ErrorMiddleware**: (`error`: `Error`, `message`: [`default`](../classes/lib_message.default.md), `next`: `Function`) => `void`

#### Type declaration

▸ (`error`, `message`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `message` | [`default`](../classes/lib_message.default.md) |
| `next` | `Function` |

##### Returns

`void`

#### Defined in

[src/middlewares/index.d.ts:4](https://github.com/fmvilas/glee/blob/5924dda/src/middlewares/index.d.ts#L4)

___

### Middleware

Ƭ **Middleware**: (`message`: [`default`](../classes/lib_message.default.md), `next`: `Function`) => `void`

#### Type declaration

▸ (`message`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |
| `next` | `Function` |

##### Returns

`void`

#### Defined in

[src/middlewares/index.d.ts:3](https://github.com/fmvilas/glee/blob/5924dda/src/middlewares/index.d.ts#L3)
