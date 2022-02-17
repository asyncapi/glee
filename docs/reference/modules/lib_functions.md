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

[src/lib/functions.ts:17](https://github.com/asyncapi/glee/blob/87abc56/src/lib/functions.ts#L17)

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

[src/lib/functions.ts:19](https://github.com/asyncapi/glee/blob/87abc56/src/lib/functions.ts#L19)

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

[src/lib/functions.ts:46](https://github.com/asyncapi/glee/blob/87abc56/src/lib/functions.ts#L46)
