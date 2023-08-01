# Configuring Glee

Glee comes with sensible defaults so you don't have to worry about configuration. However, sometimes you may want to change the behavior or customize Glee in different ways. For that purpose, you can use the `glee.config.js` file.

## The configuration file

Glee's config file is a JavaScript file that exports an async function. Something like this:

```js
export default async function () {
  // More stuff here...
}
```

This function must return an object with the following shape:

```js
export default async function () {
  return {
    glee: {},
    docs: {},
    server: {}
  }
}

```

Here is an example of a `glee.config.js` file for reference:

```js
export default async function () {
  return {
    glee: { // Glee core configurations
      lifecycleDir: './lifecycle',
      functionsDir: './functions',
      asyncapiFilePath: './asyncapi.json'
    docs: {
      enabled: true, // Enable/Disable documentation generation
      folder: 'docs', // Folder where you want the output of your docs to reside.
      template: '@asyncapi/markdown-template' // Type of template you want to use.
    },
    server: {
      'websocket': { // name of the server
        httpServer: customServer, // A custom HTTP server of your own.
        adapter: 'native', // Default. Can also be 'socket.io' or a reference to a custom adapter.
        port: process.env.PORT,
      }
    }
  };
}
```

Inside the return statement, you can specify the following options:

### Glee Core Configurations

These configurations apply to Glee itself, rather than any specific protocol.

|Field|Default|Description|
|--|--|--|
|glee.gleeDir|`.glee`|Sets the Glee directory. Your sources will be compiled here.|
|glee.lifecycleDir|`lifecycle`|Path to the directory that stores your [lifecycle events](./lifecycle-events.md).|
|glee.functionsDir|`functions`| Path to the directory that stores your [functions](./functions.md).|
|glee.asyncapiFilePath|`asyncapi.(yaml \| yml \| json)`| Path to your AsyncAPI file. |

### Generating Documentation

|Field|Description|
|--|--|
|docs.enabled|This flag enables/disables the docs generation functionality.
|docs.folder|The dedicated folder you want your generated docs to reside.
|docs.template|The AsyncAPI template you wanna use for generating your documentation.
