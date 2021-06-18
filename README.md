<h5 align="center">
  <br>
  <img src="./assets/glee.svg" alt="Glee logo" width="250">
</h5>
<p align="center">
  <em>The AsyncAPI framework that will make you smile again.</em>
</p>


> :warning: This package is still under development, it didn't reach v1.0.0 yet, and therefore is not suitable for production use yet.

## Installation

```bash
npm install @asyncapi/glee
```

## Usage

> These are temporary indications. We will offer a way to scaffold a basic Glee project.

1. Create a new Node.js project:

    ```bash
    npm init
    ```
1. Install Glee:
   ```bash
   npm install @asyncapi/glee
   ```
1. Add `dev` and `start` scripts to your package.json file:

    ```json
    "scripts": {
      "dev": "glee dev",
      "start": "glee start"
    },
    ```
1. Place or create a new `asyncapi.yaml` or `asyncapi.json` file in the root directory of the project.
1. Create functions on the `functions` folder and link them to AsyncAPI operations using the `operationId` field.

Have a look at the [examples](./examples) folder on this repository to get a better grasp on how to use it.