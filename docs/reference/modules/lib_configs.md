[@asyncapi/glee](../README.md) / lib/configs

# Module: lib/configs

## Table of contents

### Functions

- [findSpecFile](lib_configs.md#findspecfile)
- [getConfigs](lib_configs.md#getconfigs)
- [initializeConfigs](lib_configs.md#initializeconfigs)
- [loadConfigsFromFile](lib_configs.md#loadconfigsfromfile)

## Functions

### findSpecFile

▸ **findSpecFile**(`baseDir`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseDir` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/configs.ts:112](https://github.com/asyncapi/glee/blob/a8e18a8/src/lib/configs.ts#L112)

___

### getConfigs

▸ **getConfigs**(): `Object`

#### Returns

`Object`

#### Defined in

[src/lib/configs.ts:130](https://github.com/asyncapi/glee/blob/a8e18a8/src/lib/configs.ts#L130)

___

### initializeConfigs

▸ **initializeConfigs**(`config?`): `Promise`<{ `[key: string]`: `string`;  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config` |

#### Returns

`Promise`<{ `[key: string]`: `string`;  }\>

#### Defined in

[src/lib/configs.ts:23](https://github.com/asyncapi/glee/blob/a8e18a8/src/lib/configs.ts#L23)

___

### loadConfigsFromFile

▸ **loadConfigsFromFile**(): `Promise`<`any`\>

Loads the configuration from glee project.

#### Returns

`Promise`<`any`\>

#### Defined in

[src/lib/configs.ts:81](https://github.com/asyncapi/glee/blob/a8e18a8/src/lib/configs.ts#L81)
