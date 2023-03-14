[@asyncapi/glee](../README.md) / middlewares/existsInAsyncAPI

# Module: middlewares/existsInAsyncAPI

## Table of contents

### Properties

- [default](middlewares_existsInAsyncAPI.md#default)

## Properties

### default

• **default**: (`asyncapi`: `AsyncAPIDocument`) => (`event`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

#### Type declaration

▸ (`asyncapi`): (`event`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

##### Parameters

| Name       | Type               |
| :--------- | :----------------- |
| `asyncapi` | `AsyncAPIDocument` |

##### Returns

`fn`

▸ (`event`, `next`): `void`

##### Parameters

| Name    | Type                                                      |
| :------ | :-------------------------------------------------------- |
| `event` | [`default`](../classes/lib_message.default.md)            |
| `next`  | [`MiddlewareCallback`](middlewares.md#middlewarecallback) |

##### Returns

`void`
