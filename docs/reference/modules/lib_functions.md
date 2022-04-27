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

[src/lib/functions.ts:51](https://github.com/asyncapi/glee/blob/2831232/src/lib/functions.ts#L51)

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

[src/lib/functions.ts:53](https://github.com/asyncapi/glee/blob/2831232/src/lib/functions.ts#L53)

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

[src/lib/functions.ts:80](https://github.com/asyncapi/glee/blob/2831232/src/lib/functions.ts#L80)
