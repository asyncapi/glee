---
title: Getting Started
weight: 80
---

## Application structure

Glee expects your project to have some files and folders with special names. The best way to get started with Glee is using [create-glee-app](https://github.com/asyncapi/create-glee-app), which sets up everything automatically for you.

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
<!-- TODO -->