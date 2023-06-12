# asyncapicoin client 1.0.0 documentation

This app creates a client that subscribes to the server for the price change.


## Table of Contents

* [Servers](#servers)
  * [websockets](#websockets-server)
* [Operations](#operations)
  * [PUB /price](#pub-price-operation)

## Servers

### `websockets` Server

* URL: `ws://localhost:3000`
* Protocol: `ws`



## Operations

### PUB `/price` Operation

* Operation ID: `index`

#### `ws` Channel specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| bindingVersion | - | - | `"0.1.0"` | - | - |

#### Message `indexGraph`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| status | string | - | - | - | - |
| time | number | - | - | - | - |
| price | number | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "status": "string",
  "time": 0,
  "price": 0
}
```



