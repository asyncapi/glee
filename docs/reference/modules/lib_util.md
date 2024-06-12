[@asyncapi/glee](../README.md) / lib/util

# Module: lib/util

## Table of contents

### Functions

- [applyAddressParameters](lib_util.md#applyaddressparameters)
- [arrayHasDuplicates](lib_util.md#arrayhasduplicates)
- [duplicateMessage](lib_util.md#duplicatemessage)
- [extractExpressionValueFromMessage](lib_util.md#extractexpressionvaluefrommessage)
- [getMessagesSchema](lib_util.md#getmessagesschema)
- [getParams](lib_util.md#getparams)
- [gleeMessageToFunctionEvent](lib_util.md#gleemessagetofunctionevent)
- [isRemoteServer](lib_util.md#isremoteserver)
- [matchChannel](lib_util.md#matchchannel)
- [resolveFunctions](lib_util.md#resolvefunctions)
- [validateData](lib_util.md#validatedata)

## Functions

### applyAddressParameters

▸ **applyAddressParameters**(`channel`, `message?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `ChannelInterface` |
| `message?` | [`default`](../classes/lib_message.default.md) |

#### Returns

`string`

#### Defined in

[src/lib/util.ts:204](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L204)

___

### arrayHasDuplicates

▸ **arrayHasDuplicates**(`array`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `array` | `any`[] |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:121](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L121)

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

[src/lib/util.ts:53](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L53)

___

### extractExpressionValueFromMessage

▸ **extractExpressionValueFromMessage**(`message`, `expression`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Object` |
| `message.headers` | `any` |
| `message.payload` | `any` |
| `expression` | `string` |

#### Returns

`any`

#### Defined in

[src/lib/util.ts:181](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L181)

___

### getMessagesSchema

▸ **getMessagesSchema**(`operation`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `operation` | `Object` |
| `operation.messages` | () => `MessagesInterface` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `oneOf` | `AsyncAPISchemaObject`[] |

#### Defined in

[src/lib/util.ts:241](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L241)

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

[src/lib/util.ts:23](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L23)

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

[src/lib/util.ts:125](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L125)

___

### isRemoteServer

▸ **isRemoteServer**(`parsedAsyncAPI`, `serverName`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedAsyncAPI` | `AsyncAPIDocumentInterface` |
| `serverName` | `string` |

#### Returns

`boolean`

#### Defined in

[src/lib/util.ts:141](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L141)

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

[src/lib/util.ts:84](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L84)

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

[src/lib/util.ts:152](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L152)

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

[src/lib/util.ts:96](https://github.com/asyncapi/glee/blob/0f07e45/src/lib/util.ts#L96)
