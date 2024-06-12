[@asyncapi/glee](../README.md) / [errors/glee-error](../modules/errors_glee_error.md) / default

# Class: default

[errors/glee-error](../modules/errors_glee_error.md).default

## Hierarchy

- `Error`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](errors_glee_error.default.md#constructor)

### Properties

- [\_details](errors_glee_error.default.md#_details)
- [\_errors](errors_glee_error.default.md#_errors)
- [message](errors_glee_error.default.md#message)
- [name](errors_glee_error.default.md#name)
- [stack](errors_glee_error.default.md#stack)
- [prepareStackTrace](errors_glee_error.default.md#preparestacktrace)
- [stackTraceLimit](errors_glee_error.default.md#stacktracelimit)

### Accessors

- [details](errors_glee_error.default.md#details)
- [errors](errors_glee_error.default.md#errors)

### Methods

- [captureStackTrace](errors_glee_error.default.md#capturestacktrace)

## Constructors

### constructor

• **new default**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Overrides

Error.constructor

#### Defined in

[src/errors/glee-error.ts:5](https://github.com/asyncapi/glee/blob/0f07e45/src/errors/glee-error.ts#L5)

## Properties

### \_details

• `Private` **\_details**: `string`

#### Defined in

[src/errors/glee-error.ts:3](https://github.com/asyncapi/glee/blob/0f07e45/src/errors/glee-error.ts#L3)

___

### \_errors

• `Private` **\_errors**: `Error`[]

#### Defined in

[src/errors/glee-error.ts:2](https://github.com/asyncapi/glee/blob/0f07e45/src/errors/glee-error.ts#L2)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1053

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Accessors

### details

• `get` **details**(): `string`

#### Returns

`string`

#### Defined in

[src/errors/glee-error.ts:16](https://github.com/asyncapi/glee/blob/0f07e45/src/errors/glee-error.ts#L16)

___

### errors

• `get` **errors**(): `any`[]

#### Returns

`any`[]

#### Defined in

[src/errors/glee-error.ts:12](https://github.com/asyncapi/glee/blob/0f07e45/src/errors/glee-error.ts#L12)

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
