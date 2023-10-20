[@asyncapi/glee](../README.md) / lib/asyncapiFile

# Module: lib/asyncapiFile

## Table of contents

### Functions

- [getChannelAddress](lib_asyncapiFile.md#getchanneladdress)
- [getChannelNames](lib_asyncapiFile.md#getchannelnames)
- [getParsedAsyncAPI](lib_asyncapiFile.md#getparsedasyncapi)

## Functions

### getChannelAddress

▸ **getChannelAddress**(`parsedAsyncAPI`, `channelName`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedAsyncAPI` | `AsyncAPIDocumentInterface` |
| `channelName` | `string` |

#### Returns

`string`

#### Defined in

[src/lib/asyncapiFile.ts:18](https://github.com/asyncapi/glee/blob/a15e431/src/lib/asyncapiFile.ts#L18)

___

### getChannelNames

▸ **getChannelNames**(`parsedAsyncAPI`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `parsedAsyncAPI` | `AsyncAPIDocumentInterface` |

#### Returns

`string`[]

#### Defined in

[src/lib/asyncapiFile.ts:14](https://github.com/asyncapi/glee/blob/a15e431/src/lib/asyncapiFile.ts#L14)

___

### getParsedAsyncAPI

▸ **getParsedAsyncAPI**(): `Promise`<`AsyncAPIDocument`\>

#### Returns

`Promise`<`AsyncAPIDocument`\>

#### Defined in

[src/lib/asyncapiFile.ts:5](https://github.com/asyncapi/glee/blob/a15e431/src/lib/asyncapiFile.ts#L5)
