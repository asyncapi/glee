[@asyncapi/glee](../README.md) / middlewares/validate

# Module: middlewares/validate

## Table of contents

### Functions

- [default](middlewares_validate.md#default)

## Functions

### default

▸ **default**(`schema`): (`event`: [`default`](../classes/lib_message.default.md), `next`: [`MiddlewareCallback`](middlewares.md#middlewarecallback)) => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `AsyncAPISchema` |

#### Returns

`fn`

▸ (`event`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`default`](../classes/lib_message.default.md) |
| `next` | [`MiddlewareCallback`](middlewares.md#middlewarecallback) |

##### Returns

`void`

#### Defined in

[src/middlewares/validate.ts:7](https://github.com/asyncapi/glee/blob/d8e3bd7/src/middlewares/validate.ts#L7)
