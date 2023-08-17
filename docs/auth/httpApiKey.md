## Getting started with username and password authentication

This guide will walk through how to implement username and password authentication in Glee.

A sample `asyncapi.yaml` for a server with security requirements and user `HttpApiKey` security scheme is shown below:

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
      - apiKey: []

      ...

components:
  securitySchemes:
    apiKey:
      type: httpApiKey
      name: api_key
      in: query

```

A sample `asyncapi.yaml` for a client that implements some of the requirements of the server above:

```yaml
##client asyncAPI schema
servers:
  trendingAnime:
    url: http://localhost:8081
    protocol: http
    security:
      - apiKey: []
  testwebhook:
    url: ws://localhost:9000
    protocol: ws
x-remoteServers:
  - trendingAnime

  ...

components:
  securitySchemes:
    apiKey:
      type: httpApiKey
      name: api_key
      in: query
      

```

The `httpApiKey` could be in either the header or query parameter.

**The Client asyncapi.yaml file does not need to implement all the security requirements in the server, it only needs to implement the ones that it uses.**

### Client Side

Following the client `asyncapi.yaml` file above, create a file named `trendingAnime.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnime.ts
```

When using the `HttpApiKey` security scheme, it is important that you pass the parameters as follows:

```js
export async clientAuth({ parsedAsyncAPI, serverName }) {
  return {
    apiKey: process.env.APIKEY
  }
}
```

`apiKey` should be the name of the security requirement as specified in your `asyncapi.yaml` file, and it's value should be a string.


### Server side

From the server `asyncapi.yaml` file above, create a file named `trendingAnimeServer.ts` in the `auth` directory, since that is the server that has the security Property. 

```bash
touch auth/trendingAnimeServer.ts
```

On the server side, you can retrieve the values as follows

```js

export async serverAuth({ authProps, done }) {
  authProps.getHttpAPIKeys('api_key')()
  
  done(true)
}

```

`getHttpAPIKeys(name)` takes a name parameter to specify the name of the httpApiKey that is desired. Then it returns an object containing the httpApiKey value that was sent from the client.



