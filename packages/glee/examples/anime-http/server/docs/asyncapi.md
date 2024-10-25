# AsyncAPI IMDB server 1.0.0 documentation

This app is a dummy server that would stream the trending/upcoming anime.

## Table of Contents

* [Servers](#servers)
  * [trendingAnimeServer](#trendinganimeserver-server)

## Servers

### `trendingAnimeServer` Server

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

* Type: `X509`



##### Security Requirement 6

* Type: `OAuth2`
  * Flows:

    | Flow | Auth URL | Token URL | Refresh URL | Scopes |
    |---|---|---|---|---|
    | Authorization Code | - | - | - | - |
    | Client credentials | - | [https://example.com/api/oauth/dialog](https://example.com/api/oauth/dialog) | - | `delete:pets`, `update:pets` |
    | Implicit | - | - | - | - |
    | Password | - | - | - | - |









## Operations

