# AsyncAPI IMDB server 1.0.0 documentation

This app is a dummy server that would stream the trending/upcoming anime.

## Table of Contents

* [Servers](#servers)
  * [trendingAnimeServer](#trendinganimeserver-server)
* [Operations](#operations)
  * [PUB trendingAnime](#pub-trendinganime-operation)
  * [SUB trendingAnime](#sub-trendinganime-operation)

## Servers

### `trendingAnimeServer` Server

* URL: `http://localhost:8081`
* Protocol: `http`


#### Security

##### Security Requirement 1

* Type: `HTTP`
  * Scheme: bearer
  * Bearer format: JWT







## Operations

### PUB `trendingAnime` Operation

* Operation ID: `trendingAnimeController`

#### `http` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| type | - | - | `"request"` | - | - |
| method | - | - | `"POST"` | - | - |
| bindingVersion | - | - | `"0.1.0"` | - | - |
| query | object | - | - | - | **additional properties are allowed** |
| query.name | string | Name of the anime. | - | - | **required** |
| query.rating | string | Rating of the show. | - | - | **required** |
| query.genre | string | The genre of anime. | - | - | **required** |
| query.studio | string | The studio of anime. | - | - | **required** |
| body | object | - | - | - | **additional properties are allowed** |
| body.name | string | Name of the anime. | - | - | **required** |
| body.rating | string | Rating of the show. | - | - | **required** |
| body.genre | string | The genre of anime. | - | - | **required** |
| body.studio | string | The studio of anime. | - | - | **required** |

#### Message `trendingAnime`

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

#### `http` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| type | - | - | `"request"` | - | - |
| method | - | - | `"POST"` | - | - |
| bindingVersion | - | - | `"0.1.0"` | - | - |
| query | object | - | - | - | **additional properties are allowed** |
| query.name | string | Name of the anime. | - | - | **required** |
| query.rating | string | Rating of the show. | - | - | **required** |
| query.genre | string | The genre of anime. | - | - | **required** |
| query.studio | string | The studio of anime. | - | - | **required** |
| body | object | - | - | - | **additional properties are allowed** |
| body.name | string | Name of the anime. | - | - | **required** |
| body.rating | string | Rating of the show. | - | - | **required** |
| body.genre | string | The genre of anime. | - | - | **required** |
| body.studio | string | The studio of anime. | - | - | **required** |

#### Message `<anonymous-message-2>`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |

> Examples of payload _(generated)_

```json
{}
```



