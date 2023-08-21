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

[src/lib/userAuth.ts:15](https://github.com/oviecodes/glee/blob/2283982/src/lib/userAuth.ts#L15)

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

[src/lib/userAuth.ts:79](https://github.com/oviecodes/glee/blob/2283982/src/lib/userAuth.ts#L79)

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

[src/lib/userAuth.ts:17](https://github.com/oviecodes/glee/blob/2283982/src/lib/userAuth.ts#L17)

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

[src/lib/userAuth.ts:49](https://github.com/oviecodes/glee/blob/2283982/src/lib/userAuth.ts#L49)
