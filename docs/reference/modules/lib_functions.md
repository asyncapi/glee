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

[src/lib/functions.ts:68](https://github.com/asyncapi/glee/blob/cd08a2e/src/lib/functions.ts#L68)

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

[src/lib/functions.ts:70](https://github.com/asyncapi/glee/blob/cd08a2e/src/lib/functions.ts#L70)

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

[src/lib/functions.ts:108](https://github.com/asyncapi/glee/blob/cd08a2e/src/lib/functions.ts#L108)
