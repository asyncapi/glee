---
title: 'Usage'
weight: 20
---

Glee as a spec-driven framework, makes it easier to work with applications in generating documentation and running the development server.

By following the below json config from `package.json`, let's understand the usage of glee defined under `scripts` object.

```js
{
  "scripts": {
    "docs": "glee docs",
    "dev": "glee dev",
    "start": "glee start",
  }
}
```
These scripts refer to the different stages of developing an application.

`glee docs`: This script generates documentation for your project using the "Glee" documentation tool. This documentation includes information about your project's APIs, modules, and usage instructions.

`glee dev`: This script is used for starting a development server. It launches a local development server, build your project in development mode, or perform other development-related tasks.

`glee start`: This script is responsible for starting your project or application. It is used to launch a production-ready server or application instance.

To get more familiar with these scripts on how they are configured, next dive into our getting started guide.