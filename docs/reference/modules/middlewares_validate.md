[@asyncapi/glee](../README.md) / middlewares/validate

# Module: middlewares/validate

## Table of contents

### Properties

- [default](middlewares_validate.md#default)

## Properties

### default

• **default**: (`schema`: `Schema`) => (`event`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

#### Type declaration

▸ (`schema`): (`event`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

##### Parameters

| Name     | Type     |
| :------- | :------- |
| `schema` | `Schema` |

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
