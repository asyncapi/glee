[@asyncapi/glee](../README.md) / lib/adapter

# Module: lib/adapter

## Table of contents

### Classes

- [default](../classes/lib_adapter.default.md)

### Interfaces

- [GleeAdapterOptions](../interfaces/lib_adapter.GleeAdapterOptions.md)

### Type Aliases

- [AuthEvent](lib_adapter.md#authevent)
- [EnrichedEvent](lib_adapter.md#enrichedevent)

## Type Aliases

### AuthEvent

Ƭ **AuthEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `authProps` | [`AuthProps`](lib.md#authprops) |
| `doc` | `any` |
| `done` | `any` |
| `serverName` | `string` |

#### Defined in

[src/lib/adapter.ts:17](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/adapter.ts#L17)

___

### EnrichedEvent

Ƭ **EnrichedEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connection?` | [`default`](../classes/lib_connection.default.md) |
| `server` | `ServerInterface` |
| `serverName` | `string` |

#### Defined in

[src/lib/adapter.ts:11](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/adapter.ts#L11)
