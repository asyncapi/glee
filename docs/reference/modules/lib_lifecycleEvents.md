[@asyncapi/glee](../README.md) / lib/lifecycleEvents

# Module: lib/lifecycleEvents

## Table of contents

### Variables

- [events](lib_lifecycleEvents.md#events)

### Functions

- [register](lib_lifecycleEvents.md#register)
- [run](lib_lifecycleEvents.md#run)

## Variables

### events

• **events**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `IEvent`[]

#### Defined in

[src/lib/lifecycleEvents.ts:13](https://github.com/fmvilas/glee/blob/039da07/src/lib/lifecycleEvents.ts#L13)

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

[src/lib/lifecycleEvents.ts:15](https://github.com/fmvilas/glee/blob/039da07/src/lib/lifecycleEvents.ts#L15)

___

### run

▸ **run**(`lifecycleEvent`, `params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycleEvent` | `string` |
| `params` | [`GleeFunctionEvent`](lib.md#gleefunctionevent) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/lifecycleEvents.ts:50](https://github.com/fmvilas/glee/blob/039da07/src/lib/lifecycleEvents.ts#L50)
