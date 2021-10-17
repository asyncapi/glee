# Application structure

Glee expects your project to have some files and folders with special names. The best way to get started with Glee is using [create-glee-app](https://github.com/asyncapi/create-glee-app), which sets up everything automatically for you.

```
├─ functions                    (required)
│  ├─ onHello.js
│  └─ ...
├─ lifecycle                    (optional)
│  ├─ onConnect.js
│  └─ ...
├─ .env                         (optional)
├─ asyncapi.(yaml|yml|json)     (required)
├─ glee.config.js               (optional)
├─ package.json                 (required)
```

|File/Directory|Description|
|---|---|
|functions|**Required.** This directory contains all the functions that Glee must execute when it receives a message from the server. Each file must export a default async function. [Read more about the functions signature](./functions.md).
|lifecycle|This directory contains application lifecycle functions. These functions will be executed when certain events happen in the application. E.g., `onConnect`, `onServerReady`, `onDisconnect`, etc. [Read the full list of lifecycle events](./lifecycle-events.md).
|.env|The environment variables of your application. Read more about the Glee [environment variables](./env-vars.md). **DO NOT PUT SECRETS HERE**.
|asyncapi.(yaml\|yml\|json)|**Required.** The [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest) file defining your API. Make sure all the `publish` operations have an assigned `operationId` that matches a file name (excluding the extension) in the `functions` directory.
|glee.config.js|The Glee configuration file. [Read more about how to use this file](./config-file.md).
|package.json|**Required.** The Node.js package definition file. Make sure you include `@asyncapi/glee` as a dependency and add two scripts: `dev` and `start`. They should be running `glee dev` and `glee start` respectively.

