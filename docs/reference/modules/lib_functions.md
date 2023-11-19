[@asyncapi/glee](../README.md) / lib/functions

# Module: lib/functions

## Table of contents

### Variables

- [functions](lib_functions.md#functions)

### Functions

- [register](lib_functions.md#register)
- [trigger](lib_functions.md#trigger)

## Variables

### functions

• `Const` **functions**: `Map`<`string`, `FunctionInfo`\>

#### Defined in

[src/lib/functions.ts:55](https://github.com/asyncapi/glee/blob/1972258/src/lib/functions.ts#L55)

## Functions

### register

▸ **register**(`dir`): `Promise`<`void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | `string` |

#### Returns

`Promise`<`void`[]\>

#### Defined in

[src/lib/functions.ts:57](https://github.com/asyncapi/glee/blob/1972258/src/lib/functions.ts#L57)

___

### trigger

▸ **trigger**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `app` | [`default`](../classes/lib_glee.default.md) |
| › `message` | [`default`](../classes/lib_message.default.md) |
| › `operationId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/functions.ts:96](https://github.com/asyncapi/glee/blob/1972258/src/lib/functions.ts#L96)
