[@asyncapi/glee](../README.md) / lib/asyncapiFile

# Module: lib/asyncapiFile

## Table of contents

### Functions

- [getAsyncAPIFileContent](lib_asyncapiFile.md#getasyncapifilecontent)
- [getChannelAddress](lib_asyncapiFile.md#getchanneladdress)
- [getChannelNames](lib_asyncapiFile.md#getchannelnames)
- [getParsedAsyncAPI](lib_asyncapiFile.md#getparsedasyncapi)

## Functions

### getAsyncAPIFileContent

▸ **getAsyncAPIFileContent**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[src/lib/asyncapiFile.ts:9](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/asyncapiFile.ts#L9)

___

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

[src/lib/asyncapiFile.ts:35](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/asyncapiFile.ts#L35)

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

[src/lib/asyncapiFile.ts:31](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/asyncapiFile.ts#L31)

___

### getParsedAsyncAPI

▸ **getParsedAsyncAPI**(): `Promise`<`AsyncAPIDocument`\>

#### Returns

`Promise`<`AsyncAPIDocument`\>

#### Defined in

[src/lib/asyncapiFile.ts:15](https://github.com/asyncapi/glee/blob/d8e3bd7/src/lib/asyncapiFile.ts#L15)
