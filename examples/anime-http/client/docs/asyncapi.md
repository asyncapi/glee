# AsyncAPI IMDB client 1.0.0 documentation

This app creates a client that subscribes to the server for getting the top 10 trending/upcoming anime.

## Table of Contents

* [Servers](#servers)
  * [trendingAnime](#trendinganime-server)
  * [testwebhook](#testwebhook-server)
* [Operations](#operations)
  * [PUB /test](#pub-test-operation)
  * [PUB trendingAnime](#pub-trendinganime-operation)
  * [SUB trendingAnime](#sub-trendinganime-operation)

## Servers

### `trendingAnime` Server

* URL: `http://localhost:8081`
* Protocol: `http`


#### Security

##### Security Requirement 1

* Type: `HTTP`
  * Scheme: bearer
  * Bearer format: JWT




##### Security Requirement 2

* Type: `User/Password`



##### Security Requirement 3

* Type: `HTTP API key`
  * Name: api_key
  * In: query




##### Security Requirement 4

* Type: `API key`
  * In: user




##### Security Requirement 5

* Type: `OAuth2`
  * Flows:

    Required scopes: `write:pets`, `read:pets`

    | Flow | Auth URL | Token URL | Refresh URL | Scopes |
    |---|---|---|---|---|
    | Implicit | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | - | - | `write:pets`, `read:pets` |
    | Authorization Code | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | - | `delete:pets`, `update:pets` |









### `testwebhook` Server

* URL: `ws://localhost:9000`
* Protocol: `ws`



## Operations

### PUB `/test` Operation

* Operation ID: `index`

#### `ws` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| bindingVersion | - | - | `"0.1.0"` | - | - |

#### Message `test`

*ping client*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |

> Examples of payload _(generated)_

```json
{}
```



### PUB `trendingAnime` Operation

* Operation ID: `trendingAnimeListRecieverController`
* Available only on servers: [trendingAnime](#trendinganime-server)

#### `http` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| type | - | - | `"request"` | - | - |
| method | - | - | `"POST"` | - | - |
| bindingVersion | - | - | `"0.1.0"` | - | - |

#### Message `<anonymous-message-2>`

*Data required to populate trending anime*

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| name | string | Name of the anime. | - | - | **required** |
| rating | string | Rating of the show. | - | - | **required** |
| genre | string | The genre of anime. | - | - | **required** |
| studio | string | The studio of anime. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "name": "string",
  "rating": "string",
  "genre": "string",
  "studio": "string"
}
```



### SUB `trendingAnime` Operation

* Available only on servers: [trendingAnime](#trendinganime-server)

#### `http` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| type | - | - | `"request"` | - | - |
| method | - | - | `"POST"` | - | - |
| bindingVersion | - | - | `"0.1.0"` | - | - |

#### Message `<anonymous-message-3>`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |

> Examples of payload _(generated)_

```json
{}
```



