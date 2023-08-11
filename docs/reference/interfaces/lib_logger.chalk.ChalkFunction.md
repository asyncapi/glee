[@asyncapi/glee](../README.md) / [lib/logger](../modules/lib_logger.md) / [chalk](../modules/lib_logger.chalk.md) / ChalkFunction

# Interface: ChalkFunction

[lib/logger](../modules/lib_logger.md).[chalk](../modules/lib_logger.chalk.md).ChalkFunction

## Hierarchy

- **`ChalkFunction`**

  ↳ [`Chalk`](lib_logger.chalk.Chalk.md)

## Callable

### ChalkFunction

▸ **ChalkFunction**(`text`, `...placeholders`): `string`

Use a template string.

**`Remarks`**

Template literals are unsupported for nested calls (see [issue #341](https://github.com/chalk/chalk/issues/341))

**`Example`**

```
import chalk = require('chalk');

log(chalk`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);
```

**`Example`**

```
import chalk = require('chalk');

log(chalk.red.bgBlack`2 + 3 = {bold ${2 + 3}}`)
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `TemplateStringsArray` |
| `...placeholders` | `unknown`[] |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:148

### ChalkFunction

▸ **ChalkFunction**(`...text`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...text` | `unknown`[] |

#### Returns

`string`

#### Defined in

node_modules/chalk/index.d.ts:150
