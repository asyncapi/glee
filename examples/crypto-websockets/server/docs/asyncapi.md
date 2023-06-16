# asyncapicoin server 1.0.0 documentation

This app is a dummy server that would stream the price of a fake cryptocurrency

## Table of Contents

- [Servers](#servers)
  - [websocket](#websocket-server)
- [Operations](#operations)
  - [SUB /price](#sub-price-operation)

## Servers

### `websocket` Server

- URL: `ws://localhost:3000`
- Protocol: `ws`

## Operations

### SUB `/price` Operation

#### `ws` Channel specific information

| Name           | Type   | Description | Value     | Constraints | Notes                                 |
| -------------- | ------ | ----------- | --------- | ----------- | ------------------------------------- |
| bindingVersion | -      | -           | `"0.1.0"` | -           | -                                     |
| headers        | object | -           | -         | -           | **additional properties are allowed** |
| headers.token  | string | -           | -         | -           | -                                     |

#### Message `indexGraph`

_Data required for drawing index graph_

##### Payload

| Name   | Type   | Description | Value | Constraints | Notes                                 |
| ------ | ------ | ----------- | ----- | ----------- | ------------------------------------- |
| (root) | object | -           | -     | -           | **additional properties are allowed** |
| status | string | -           | -     | -           | -                                     |
| time   | number | -           | -     | -           | -                                     |
| price  | number | -           | -     | -           | -                                     |

> Examples of payload _(generated)_

```json
{
  "status": "string",
  "time": 0,
  "price": 0
}
```
