[@asyncapi/glee](../README.md) / lib/logger

# Module: lib/logger

## Table of contents

### Namespaces

- [chalk](lib_logger.chalk.md)

### Variables

- [chalk](lib_logger.md#chalk)

### Functions

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

## Variables

### chalk

• **chalk**: [`Chalk`](../interfaces/lib_logger.chalk.Chalk.md) & [`ChalkFunction`](../interfaces/lib_logger.chalk.ChalkFunction.md) & { `BackgroundColor`: `BackgroundColor` ; `Color`: `Color` ; `ForegroundColor`: `ForegroundColor` ; `Level`: [`Level`](lib_logger.chalk.md#level) ; `Modifiers`: `Modifiers` ; `stderr`: [`Chalk`](../interfaces/lib_logger.chalk.Chalk.md) & { `supportsColor`: ``false`` \| [`ColorSupport`](../interfaces/lib_logger.chalk.ColorSupport.md)  } ; `supportsColor`: ``false`` \| [`ColorSupport`](../interfaces/lib_logger.chalk.ColorSupport.md)  }

#### Defined in

node_modules/chalk/index.d.ts:405

## Functions

### logEmptyLines

▸ **logEmptyLines**(`amount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:43](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L43)

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

[src/lib/logger.ts:129](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L129)

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

[src/lib/logger.ts:123](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L123)

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

[src/lib/logger.ts:110](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L110)

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

[src/lib/logger.ts:92](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L92)

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

[src/lib/logger.ts:105](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L105)

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

[src/lib/logger.ts:83](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L83)

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

[src/lib/logger.ts:115](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L115)

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

[src/lib/logger.ts:150](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L150)

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

[src/lib/logger.ts:146](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L146)

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

[src/lib/logger.ts:98](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L98)

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

[src/lib/logger.ts:49](https://github.com/asyncapi/glee/blob/2557652/src/lib/logger.ts#L49)
