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

• `Const` **events**: `Map`<`string`, `IEvent`[]\>

#### Defined in

[src/lib/lifecycleEvents.ts:18](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/lifecycleEvents.ts#L18)

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

[src/lib/lifecycleEvents.ts:20](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/lifecycleEvents.ts#L20)

___

### run

▸ **run**(`lifecycleEvent`, `params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifecycleEvent` | `string` |
| `params` | [`GleeLifecycleEvent`](lib.md#gleelifecycleevent) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/lifecycleEvents.ts:60](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/lifecycleEvents.ts#L60)
