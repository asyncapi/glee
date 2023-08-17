# Authentication

<!-- Glee relies on functions to execute your business logic. Functions are files that export a default async Node.js function: -->

Authentication in Glee can be done using authentication functions. Authentication functions are files that export either one or both of the `clientAuth` and `serverAuth` Node.js functions:

```js
/* websocket.js */

export async function serverAuth({ authProps, done }) {
  //server auth logic
}

export async function clientAuth({ parsedAsyncAPI, serverName }) {
  //client auth logic
}
```

Glee looks for authentication files in the `auth` directory, the name of the authentication file should be the name of the targeted server that the authentication logic should work for.

## Supported Authentication Values in AsyncAPI.yaml file

AsyncAPI currently supports a variety of authentication formats as specified in the documentation, however Glee supports the following authentication schemas.

A sample `asyncapi.yaml` for a server with security requirements and security schemes is shown below:

```yaml
##server asyncAPI schema
asyncapi: 2.6.0
info:
  title: AsyncAPI IMDB server
  version: 1.0.0
  description: This app is a dummy server that would stream the trending/upcoming anime.
servers:
  trendingAnimeServer:
    url: 'http://localhost:8081'
    protocol: http
    security:
      - token: []
      - userPass: []
      - apiKey: []
      - UserOrPassKey: []
      - oauth: []

      ...

components:
  securitySchemes:
    token:
      type: http
      scheme: bearer
      bearerFormat: JWT
    userPass:
      type: userPassword
    apiKey:
      type: httpApiKey
      name: api_key
      in: query
    UserOrPassKey:
      type: apiKey
      in: user
    oauth:
        type: oauth2
        flows:
          clientCredentials:
            tokenUrl: https://example.com/api/oauth/dialog
            scopes:
              delete:pets: modify pets in your account
              update:pets: read your pets

```

A sample `asyncAPI.yaml` for a client that implements some of the requirements of the server above:

```yaml
##client asyncAPI schema
servers:
  trendingAnime:
    url: http://localhost:8081
    protocol: http
    security:
      - token: []
      - userPass: []
      - apiKey: []
      - oauth:
        - write:pets
        - read:pets
  testwebhook:
    url: ws://localhost:9000
    protocol: ws
x-remoteServers:
  - trendingAnime

  ...

components:
  securitySchemes:
    token:
      type: http
      scheme: bearer
      bearerFormat: JWT
    userPass:
      type: userPassword
    apiKey:
      type: httpApiKey
      name: api_key
      in: query
      oauth:
        type: oauth2
        flows:
          clientCredentials:
            tokenUrl: https://example.com/api/oauth/dialog
            scopes:
              delete:pets: modify pets in your account
              update:pets: read your pets



```

**The Client asyncapi.yaml file does not need to implement all the security requirements in the server, it only needs to implement the ones that it uses.**

## Server Authentication in Glee

The `serverAuth` function takes an argument that can be destructured as follows

| Attribute  | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| callback   | The done function that tells the server to proceed.             |
| authProps  | The authentication parameters recieved from the client.         |
| serverName | The name of the server/broker from which the event was emitted. |
| doc        | The parsedAsyncAPI schema                                       |

### done()

The `done` parameter in the `serverAuth` function allows the broker/server to know what to do next depending on the boolean value you pass to it.

```js
/* websocket.js */

export async function serverAuth({ authProps, done }) {
  // done(true)
  //done(false, 401, "Unauthorized")
  // done(false)
}
```

When `true` is passed to the done parameter, the server/broker knows to go ahead and allow the client to connect, which means authentication has succeeded. However if the `done` parameter is called with `false` then the server knows to throw an error message and reject the client, which means authenticatio has failed.

`done()` should always be the last thing called in a `serverAuth` function, Glee won't execute any logic beyond the `done()` call.

### authProps

`authProps` implements a couple of methods that allows the server to retrieve the authentication parameters from the client, below are the current available methods;

```js
export async function serverAuth({ authProps, done }) {
  //some network request

  authProps.getOauthToken()
  authProps.getHttpAPIKeys('api_key')
  authProps.getToken()
  authProps.getUserPass()

  // done(false, 401, "Unauthorized");
  done(false)
}
```

| Method                 | Description                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| `getOauthToken()`      | returns the oauth authentication parameter                                                       |
| `getHttpAPIKeys(name)` | returns the HttpAPIKeys parameter with the specified name from either headers or query parameter |
| `getToken()`           | returns the http bearer token parameter                                                          |
| `getUserPass()`        | returns username and password parameters                                                         |

## Client Authentication in Glee

The `clientAuth` function also takes an argument, and it's argument can be destructured as follows

| Attribute      | Description                                                                           |
| -------------- | ------------------------------------------------------------------------------------- |
| parsedAsyncAPI | The parsedAsyncAPI schema.                                                            |
| serverName     | The name of the server/broker from with the authentication parameters are being sent. |

### possible authentication parameters

The possible authentication parameters are shown in the code snippet below:

```js
export async function clientAuth({ serverName }) {
  return {
    token: process.env.TOKEN,
    oauth: process.env.OAUTH2,
    apiKey: process.env.APIKEY,
    userPass: {
      user: process.env.user,
      password: process.env.password,
    },
  }
}
```

**The name of the authentication parameters should be the same as the names specified in the asyncAPI.yaml file.**

| auth type                             | values                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------- |
| http bearer (JWT)                     | Value should be a JWT string                                           |
| Oauth2                                | The value should should be a string                                    |
| httpApiKey in headers or query params | The value should be a string                                           |
| userPass                              | The value should be an object with the user and password as properties |
