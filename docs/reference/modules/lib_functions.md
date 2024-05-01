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

[src/lib/functions.ts:67](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/functions.ts#L67)

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

[src/lib/functions.ts:69](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/functions.ts#L69)

___

### trigger

▸ **trigger**(`«destructured»`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `app` | [`default`](../classes/lib_glee.default.md) |
| › `message` | [`default`](../classes/lib_message.default.md) |
| › `operation` | `OperationInterface` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/functions.ts:107](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/functions.ts#L107)
