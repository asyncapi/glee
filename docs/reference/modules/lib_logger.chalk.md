[@asyncapi/glee](../README.md) / [lib/logger](lib_logger.md) / chalk

# Namespace: chalk

[lib/logger](lib_logger.md).chalk

## Table of contents

### Interfaces

- [Chalk](../interfaces/lib_logger.chalk.Chalk.md)
- [ChalkFunction](../interfaces/lib_logger.chalk.ChalkFunction.md)
- [ColorSupport](../interfaces/lib_logger.chalk.ColorSupport.md)
- [Options](../interfaces/lib_logger.chalk.Options.md)

### Type aliases

- [Instance](lib_logger.chalk.md#instance)
- [Level](lib_logger.chalk.md#level)

## Type aliases

### Instance

Ƭ **Instance**: (`options?`: [`Options`](../interfaces/lib_logger.chalk.Options.md)) => [`Chalk`](../interfaces/lib_logger.chalk.Chalk.md)

#### Type declaration

• (`options?`)

Return a new Chalk instance.

##### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](../interfaces/lib_logger.chalk.Options.md) |

#### Defined in

node_modules/chalk/index.d.ts:97

___

### Level

Ƭ **Level**: ``0`` \| ``1`` \| ``2`` \| ``3``

Levels:
- `0` - All colors disabled.
- `1` - Basic 16 colors support.
- `2` - ANSI 256 colors support.
- `3` - Truecolor 16 million colors support.

#### Defined in

node_modules/chalk/index.d.ts:77
