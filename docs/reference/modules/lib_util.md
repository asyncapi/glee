[@asyncapi/glee](../README.md) / lib/util

# Module: lib/util

## Table of contents

### Functions

- [arrayHasDuplicates](lib_util.md#arrayhasduplicates)
- [duplicateMessage](lib_util.md#duplicatemessage)
- [getParams](lib_util.md#getparams)
- [gleeMessageToFunctionEvent](lib_util.md#gleemessagetofunctionevent)
- [matchChannel](lib_util.md#matchchannel)
- [validateData](lib_util.md#validatedata)

## Functions

### arrayHasDuplicates

▸ `Const` **arrayHasDuplicates**(`array`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:106](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L106)

___

### duplicateMessage

▸ `Const` `Private` **duplicateMessage**(`message`): [`default`](../classes/lib_message.default.md)

Duplicates a GleeMessage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) | The message to duplicate. |

#### Returns

[`default`](../classes/lib_message.default.md)

#### Defined in

[src/lib/util.ts:44](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L44)

___

### getParams

▸ `Const` `Private` **getParams**(`path`, `channel`): `Object`

Determines if a path matches a channel, and returns the matching params and its values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path. |
| `channel` | `string` | The channel. |

#### Returns

`Object`

#### Defined in

[src/lib/util.ts:22](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L22)

___

### gleeMessageToFunctionEvent

▸ `Const` **gleeMessageToFunctionEvent**(`message`, `glee`): [`GleeFunctionEvent`](lib.md#gleefunctionevent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |
| `glee` | [`default`](../classes/lib_glee.default.md) |

#### Returns

[`GleeFunctionEvent`](lib.md#gleefunctionevent)

#### Defined in

[src/lib/util.ts:110](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L110)

___

### matchChannel

▸ `Const` `Private` **matchChannel**(`path`, `channel`): `boolean`

Determines if a path matches a channel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | The path. |
| `channel` | `string` | The channel. |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:72](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L72)

___

### validateData

▸ `Const` `Private` **validateData**(`data`, `schema`): `IValidateDataReturn`

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

[src/lib/util.ts:84](https://github.com/asyncapi/glee/blob/7f9d541/src/lib/util.ts#L84)
