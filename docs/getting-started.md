---
title: Getting Started
weight: 80
---

## Application structure

Glee expects your project to have some files and folders with special names. When you run `asyncapi new glee`, [AsyncAPI CLI](https://github.com/asyncapi/cli) generates a boilerplate application structure by creating a new folder and populating an initial set of files as shown below. You can continue working in this default structure, adding new components, as described throughout the documentation of asyncapi cli.

```
├─ functions          (required)
│  ├─ onHello.js
│  └─ ...
├─ lifecycle          (optional)
│  ├─ onConnect.js
│  └─ ...
├─ .env               (optional)
├─ asyncapi.(yaml | yml | json)      (required)
├─ glee.config.js     (optional)
├─ package.json       (required)
```

|File/Directory|Description|
|---|---|
|functions|**Required.** This directory contains all the functions that Glee must execute when it receives a message from the server. Each file must export a default async function.
|lifecycle|This directory contains application lifecycle functions. These functions will be executed when certain events happen in the application. E.g., `onConnect`, `onServerReady`, `onDisconnect`, etc.
|.env|The environment variables of your application. **DO NOT PUT SECRETS HERE**.
|asyncapi.(yaml or json or yml)|**Required.** The [AsyncAPI](https://www.asyncapi.com/docs/specifications/latest) file defines your API. Make sure all the `publish` operations have an assigned `operationId` that matches a file name (excluding the extension) in the `functions` directory.
|glee.config.js| The Glee configuration file.
|package.json|**Required.** The Node.js package definition file. Make sure you include `@asyncapi/glee` as a dependency and add two scripts: `dev` and `start`. They should be running `glee dev` and `glee start` respectively.

To understand the structure in a broader way, please refer to the associated page's links. 