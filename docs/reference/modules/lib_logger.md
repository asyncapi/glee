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

• **chalk**: [`Chalk`](../interfaces/lib_logger.chalk.Chalk.md) & [`ChalkFunction`](../interfaces/lib_logger.chalk.ChalkFunction.md) & { `BackgroundColor`: `BackgroundColor` ; `Color`: `Color` ; `ForegroundColor`: `ForegroundColor` ; `Level`: [`Level`](lib_logger.chalk.md#level) ; `Modifiers`: `Modifiers` ; `stderr`: [`Chalk`](../interfaces/lib_logger.chalk.Chalk.md) & { `supportsColor`: `false` \| [`ColorSupport`](../interfaces/lib_logger.chalk.ColorSupport.md) } ; `supportsColor`: `false` \| [`ColorSupport`](../interfaces/lib_logger.chalk.ColorSupport.md) }

Main Chalk object that allows to chain styles together.
Call the last one as a method with a string argument.
Order doesn't matter, and later styles take precedent in case of a conflict.
This simply means that `chalk.red.yellow.green` is equivalent to `chalk.green`.

#### Defined in

node_modules/chalk/index.d.ts:405

## Functions

### logEmptyLines

▸ `Const` **logEmptyLines**(`amount`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `amount` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:43](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L43)

---

### logError

▸ `Const` **logError**(`error`, `options?`): `void`

#### Parameters

| Name      | Type                                                            |
| :-------- | :-------------------------------------------------------------- |
| `error`   | [`default`](../classes/errors_glee_error.default.md) \| `Error` |
| `options` | `ILogErrorOptions`                                              |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:129](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L129)

---

### logErrorLine

▸ `Const` **logErrorLine**(`message`, `__namedParameters?`): `void`

#### Parameters

| Name                | Type          |
| :------------------ | :------------ |
| `message`           | `string`      |
| `__namedParameters` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:123](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L123)

---

### logInboundMessage

▸ `Const` **logInboundMessage**(`message`): `void`

#### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `message` | [`default`](../classes/lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:110](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L110)

---

### logInfoMessage

▸ `Const` **logInfoMessage**(`text`, `__namedParameters?`): `void`

#### Parameters

| Name                | Type          |
| :------------------ | :------------ |
| `text`              | `string`      |
| `__namedParameters` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:92](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L92)

---

### logJSON

▸ `Const` **logJSON**(`json`, `__namedParameters?`): `void`

#### Parameters

| Name                      | Type                |
| :------------------------ | :------------------ |
| `json`                    | `object` \| `any`[] |
| `__namedParameters`       | `Object`            |
| `__namedParameters.error` | `boolean`           |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:105](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L105)

---

### logLineWithIcon

▸ `Const` **logLineWithIcon**(`icon`, `text`, `__namedParameters?`): `void`

#### Parameters

| Name                | Type                      |
| :------------------ | :------------------------ |
| `icon`              | `string`                  |
| `text`              | `string`                  |
| `__namedParameters` | `ILogLineWithIconOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:83](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L83)

---

### logOutboundMessage

▸ `Const` **logOutboundMessage**(`message`): `void`

#### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `message` | [`default`](../classes/lib_message.default.md) |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:115](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L115)

---

### logTypeScriptError

▸ `Const` **logTypeScriptError**(`code`, `message`, `fileName`, `line`, `character`): `void`

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `code`      | `number` |
| `message`   | `string` |
| `fileName`  | `string` |
| `line`      | `number` |
| `character` | `number` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:150](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L150)

---

### logTypeScriptMessage

▸ `Const` **logTypeScriptMessage**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:146](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L146)

---

### logWarningMessage

▸ `Const` **logWarningMessage**(`text`, `__namedParameters?`): `void`

#### Parameters

| Name                | Type          |
| :------------------ | :------------ |
| `text`              | `string`      |
| `__namedParameters` | `ILogOptions` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:98](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L98)

---

### logWelcome

▸ `Const` **logWelcome**(`__namedParameters`): `void`

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `__namedParameters` | `Object` |

#### Returns

`void`

#### Defined in

[src/lib/logger.ts:49](https://github.com/asyncapi/glee/blob/388e335/src/lib/logger.ts#L49)
