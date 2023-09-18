---
title: 'Usage'
weight: 20
---

Glee as a spec-driven framework, makes it easier to work with applications in generating documentation and running the development server.

Following the below json config from `package.json`, let's understand the usage of glee defined under `scripts` object.

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

While working with the CLI, it's always necessary to have docs and code always in sync. Glee will automatically generate documentation for your application or you can also generate your documentation yourself by running:

```
glee docs
```

<!-- TODO -->