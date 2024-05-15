[@asyncapi/glee](../README.md) / lib/userAuth

# Module: lib/userAuth

## Table of contents

### Variables

- [authFunctions](lib_userAuth.md#authfunctions)

### Functions

- [clientAuthConfig](lib_userAuth.md#clientauthconfig)
- [register](lib_userAuth.md#register)
- [triggerAuth](lib_userAuth.md#triggerauth)

## Variables

### authFunctions

• `Const` **authFunctions**: `Map`<`string`, `AuthFunctionInfo`\>

#### Defined in

[src/lib/userAuth.ts:13](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/userAuth.ts#L13)

## Functions

### clientAuthConfig

▸ **clientAuthConfig**(`serverName`): `Promise`<[`GleeAuthFunction`](lib.md#gleeauthfunction)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverName` | `string` |

#### Returns

`Promise`<[`GleeAuthFunction`](lib.md#gleeauthfunction)\>

#### Defined in

[src/lib/userAuth.ts:76](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/userAuth.ts#L76)

___

### register

▸ **register**(`dir`): `Promise`<`void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dir` | `string` |

#### Returns

`Promise`<`void`[]\>

#### Defined in

[src/lib/userAuth.ts:15](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/userAuth.ts#L15)

___

### triggerAuth

▸ **triggerAuth**(`params`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GleeAuthFunctionEvent`](lib.md#gleeauthfunctionevent) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/lib/userAuth.ts:47](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/userAuth.ts#L47)
