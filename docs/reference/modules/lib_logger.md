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

[src/lib/logger.ts:43](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L43)

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

[src/lib/logger.ts:129](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L129)

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

[src/lib/logger.ts:123](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L123)

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

[src/lib/logger.ts:110](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L110)

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

[src/lib/logger.ts:92](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L92)

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

[src/lib/logger.ts:105](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L105)

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

[src/lib/logger.ts:83](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L83)

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

[src/lib/logger.ts:115](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L115)

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

[src/lib/logger.ts:150](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L150)

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

[src/lib/logger.ts:146](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L146)

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

[src/lib/logger.ts:98](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L98)

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

[src/lib/logger.ts:49](https://github.com/asyncapi/glee/blob/05a4b50/src/lib/logger.ts#L49)
