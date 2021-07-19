# Application structure

Glee expects your project to have some files and folders with special names. The best way to get started with Glee is using [create-glee-app](https://github.com/asyncapi/create-glee-app), which sets up everything automatically for you.

```
├─ functions          (required)
│  ├─ onHello.js
│  └─ ...
├─ lifecycle          (optional)
│  ├─ onConnect.js
│  └─ ...
├─ .env               (required)
├─ asyncapi.yaml      (required)
├─ glee.config.js     (optional)
├─ package.json       (required)
```

|File/Directory|Description|
|---|---|
|functions|**Required.** This directory contains all the functions that Glee must execute when it receives a message from the server. Each file must export a default async function. [Read more about the functions signature](docs/functions.md).
|lifecycle|This directory contains application lifecycle functions. These functions will be executed when certain events happen in the application. E.g., `onConnect`, `onServerReady`, `onDisconnect`, etc. [Read the full list of lifecycle events](docs/lifecycle-events.md).
|.env|**Required.** The environment variables of your application. At the very minimum, it must contain the `GLEE_SERVER_NAMES` variable with a comma-separated list of the servers you want to load at startup. **DO NOT PUT SECRETS HERE**.
|asyncapi.yaml|**Required.** The [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest) file defining your API. Make sure all the `publish` operations have an assigned `operationId` that matches a file name (excluding the extension) in the `functions` directory.
|glee.config.js|The Glee configuration file. [Read more about how to use this file](./config-file.md).
|package.json|**Required.** The Node.js package definition file. Make sure you include `@asyncapi/glee` as a dependency and add two scripts: `dev` and `start`. They should be running `glee dev` and `glee start` respectively.