# AsyncAPI IMDB client 1.0.0 documentation

This app creates a client that subscribes to the server for getting the top 10 trending/upcoming anime.

## Table of Contents

* [Servers](#servers)
  * [trendingAnime](#trendinganime-server)
  * [testwebhook](#testwebhook-server)

## Servers

### `trendingAnime` Server

* URL: `http://localhost:8081/`
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
    | Authorization Code | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | - | `delete:pets`, `update:pets` |
    | Client credentials | - | - | - | - |
    | Implicit | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | - | - | `write:pets`, `read:pets` |
    | Password | - | - | - | - |









### `testwebhook` Server

* URL: `ws://localhost:9000/`
* Protocol: `ws`



## Operations

