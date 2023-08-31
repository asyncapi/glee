[@asyncapi/glee](../README.md) / lib/util

# Module: lib/util

## Table of contents

### Functions

- [arrayHasDuplicates](lib_util.md#arrayhasduplicates)
- [duplicateMessage](lib_util.md#duplicatemessage)
- [getParams](lib_util.md#getparams)
- [gleeMessageToFunctionEvent](lib_util.md#gleemessagetofunctionevent)
- [isRemoteServer](lib_util.md#isremoteserver)
- [matchChannel](lib_util.md#matchchannel)
- [resolveFunctions](lib_util.md#resolvefunctions)
- [validateData](lib_util.md#validatedata)

## Functions

### arrayHasDuplicates

▸ **arrayHasDuplicates**(`array`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:118](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L118)

___

### duplicateMessage

▸ `Private` **duplicateMessage**(`message`): [`default`](../classes/lib_message.default.md)

Duplicates a GleeMessage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) | The message to duplicate. |

#### Returns

[`default`](../classes/lib_message.default.md)

#### Defined in

[src/lib/util.ts:52](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L52)

___

### getParams

▸ `Private` **getParams**(`path`, `channel`): `Object`

Determines if a path matches a channel, and returns the matching params and its values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path. |
| `channel` | `string` | The channel. |

#### Returns

`Object`

#### Defined in

[src/lib/util.ts:22](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L22)

___

### gleeMessageToFunctionEvent

▸ **gleeMessageToFunctionEvent**(`message`, `glee`): [`GleeFunctionEvent`](lib.md#gleefunctionevent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |
| `glee` | [`default`](../classes/lib_glee.default.md) |

#### Returns

[`GleeFunctionEvent`](lib.md#gleefunctionevent)

#### Defined in

[src/lib/util.ts:122](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L122)

___

### isRemoteServer

▸ **isRemoteServer**(`parsedAsyncAPI`, `serverName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedAsyncAPI` | `AsyncAPIDocument` |
| `serverName` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:137](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L137)

___

### matchChannel

▸ `Private` **matchChannel**(`path`, `channel`): `boolean`

Determines if a path matches a channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path. |
| `channel` | `string` | The channel. |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:81](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L81)

___

### resolveFunctions

▸ **resolveFunctions**(`object`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/util.ts:148](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L148)

___

### validateData

▸ `Private` **validateData**(`data`, `schema`): `IValidateDataReturn`

Validates data against a given JSON Schema definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The data to validate |
| `schema` | `object` | A JSON Schema definition |

#### Returns

`IValidateDataReturn`

Object

#### Defined in

[src/lib/util.ts:93](https://github.com/asyncapi/glee/blob/75f1ced/src/lib/util.ts#L93)
