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

• **events**: `Map`<`string`, `IEvent`[]\>

#### Defined in

[src/lib/lifecycleEvents.ts:14](https://github.com/asyncapi/glee/blob/87abc56/src/lib/lifecycleEvents.ts#L14)

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

[src/lib/lifecycleEvents.ts:16](https://github.com/asyncapi/glee/blob/87abc56/src/lib/lifecycleEvents.ts#L16)

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

[src/lib/lifecycleEvents.ts:51](https://github.com/asyncapi/glee/blob/87abc56/src/lib/lifecycleEvents.ts#L51)
