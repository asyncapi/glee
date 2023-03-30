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

[src/lib/util.ts:107](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L107)

___

### duplicateMessage

▸ `Private` **duplicateMessage**(`message`): [`default`](../classes/lib_message.default.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |  |

#### Returns

[`default`](../classes/lib_message.default.md)

#### Defined in

[src/lib/util.ts:44](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L44)

___

### getParams

▸ `Private` **getParams**(`path`, `channel`): `Object`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` |  |
| `channel` | `string` |  |

#### Returns

`Object`

#### Defined in

[src/lib/util.ts:22](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L22)

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

[src/lib/util.ts:111](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L111)

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

[src/lib/util.ts:123](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L123)

___

### matchChannel

▸ `Private` **matchChannel**(`path`, `channel`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` |  |
| `channel` | `string` |  |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:73](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L73)

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

[src/lib/util.ts:128](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L128)

___

### validateData

▸ `Private` **validateData**(`data`, `schema`): `IValidateDataReturn`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` |  |
| `schema` | `object` |  |

#### Returns

`IValidateDataReturn`

#### Defined in

[src/lib/util.ts:85](https://github.com/asyncapi/glee/blob/8907e8a/src/lib/util.ts#L85)
