[@asyncapi/glee](../README.md) / lib/logger

# Module: lib/logger

## Table of contents

### Namespaces

- [chalk](lib_logger.chalk.md)

### Functions

- [chalk](lib_logger.md#chalk)
- [logEmptyLines](lib_logger.md#logemptylines)
- [logError](lib_logger.md#logerror)
- [logErrorLine](lib_logger.md#logerrorline)
- [logInboundMessage](lib_logger.md#loginboundmessage)
- [logInfoMessage](lib_logger.md#loginfomessage)
- [logJSON](lib_logger.md#logjson)
- [logLineWithIcon](lib_logger.md#loglinewithicon)
- [logOutboundMessage](lib_logger.md#logoutboundmessage)
- [logTypeScriptError](lib_logger.md#logtypescripterror)
- [logTypeScriptMessage](lib_logger.md#logtypescriptmessage)
- [logWarningMessage](lib_logger.md#logwarningmessage)
- [logWelcome](lib_logger.md#logwelcome)

## Functions

### chalk

▸ **chalk**(`text`, `...placeholders`): `string`

Main Chalk object that allows to chain styles together.
Call the last one as a method with a string argument.
Order doesn't matter, and later styles take precedent in case of a conflict.
This simply means that `chalk.red.yellow.green` is equivalent to `chalk.green`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `TemplateStringsArray` |
| `...placeholders` | `unknown`[] |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:148

▸ **chalk**(`...text`): `string`

Main Chalk object that allows to chain styles together.
Call the last one as a method with a string argument.
Order doesn't matter, and later styles take precedent in case of a conflict.
This simply means that `chalk.red.yellow.green` is equivalent to `chalk.green`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...text` | `unknown`[] |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:150

___

### logEmptyLines

▸ **logEmptyLines**(`amount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:43](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L43)

___

### logError

▸ **logError**(`error`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` \| [`default`](../classes/errors_glee_error.default.md) |
| `options` | `ILogErrorOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:206](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L206)

___

### logErrorLine

▸ **logErrorLine**(`message`, `«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `«destructured»` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:195](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L195)

___

### logInboundMessage

▸ **logInboundMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:170](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L170)

___

### logInfoMessage

▸ **logInfoMessage**(`text`, `«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `«destructured»` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:139](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L139)

___

### logJSON

▸ **logJSON**(`json`, `«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `object` \| `any`[] |
| `«destructured»` | `Object` |
| › `error` | `boolean` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:158](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L158)

___

### logLineWithIcon

▸ **logLineWithIcon**(`icon`, `text`, `«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `string` |
| `text` | `string` |
| `«destructured»` | `ILogLineWithIconOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:116](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L116)

___

### logOutboundMessage

▸ **logOutboundMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`default`](../classes/lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:180](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L180)

___

### logTypeScriptError

▸ **logTypeScriptError**(`code`, `message`, `fileName`, `line`, `character`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `number` |
| `message` | `string` |
| `fileName` | `string` |
| `line` | `number` |
| `character` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:232](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L232)

___

### logTypeScriptMessage

▸ **logTypeScriptMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:228](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L228)

___

### logWarningMessage

▸ **logWarningMessage**(`text`, `«destructured»?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `«destructured»` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:148](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L148)

___

### logWelcome

▸ **logWelcome**(`«destructured»`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:49](https://github.com/asyncapi/glee/blob/839fc28/src/lib/logger.ts#L49)
