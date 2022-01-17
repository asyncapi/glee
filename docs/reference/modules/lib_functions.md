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

• **functions**: `Map`<`string`, `FunctionInfo`\>

#### Defined in

[src/lib/functions.ts:16](https://github.com/asyncapi/glee/blob/d0cc5dc/src/lib/functions.ts#L16)

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

[src/lib/functions.ts:18](https://github.com/asyncapi/glee/blob/d0cc5dc/src/lib/functions.ts#L18)

___

### trigger

▸ **trigger**(`__namedParameters`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.app` | [`default`](../classes/lib_glee.default.md) |
| `__namedParameters.message` | [`default`](../classes/lib_message.default.md) |
| `__namedParameters.operationId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/functions.ts:45](https://github.com/asyncapi/glee/blob/d0cc5dc/src/lib/functions.ts#L45)
