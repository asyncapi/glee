# Test HTTP in glee using httpbin.org 1.0.0 documentation

This app is a test app. it will send requests to httpbin.org to see if glee works well with http protocol.

## Table of Contents

* [Servers](#servers)
  * [httpbin.org](#httpbinorg-server)
  * [local-trigger](#local-trigger-server)

## Servers

### `httpbin.org` Server

* URL: `https://httpbin.org/`
* Protocol: `https`



### `local-trigger` Server

* URL: `http://localhost:3000/`
* Protocol: `http`



## Operations

### SEND `/` Operation

* Operation ID: `sendTrigger`
* Available only on servers: [local-trigger](#local-trigger-server)

#### Message `string`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | string | - | - | - | - |

> Examples of payload _(generated)_

```json
"string"
```


#### `http` Message specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| headers | object | - | - | - | **additional properties are allowed** |
| headers.a | string | - | - | - | **required** |
| headers.b | string | - | - | - | **required** |


### REPLY `/` Operation

* Operation ID: `receiveTrigger`
* Available only on servers: [local-trigger](#local-trigger-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"POST"` | - | - |

Request contains **one of** the following messages:

#### Message `string`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | string | - | - | - | - |

> Examples of payload _(generated)_

```json
"string"
```


#### `http` Message specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| headers | object | - | - | - | **additional properties are allowed** |
| headers.a | string | - | - | - | **required** |
| headers.b | string | - | - | - | **required** |

#### Message `empty`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | null | - | - | - | - |

> Examples of payload _(generated)_

```json
""
```


#### Response information

*  should be done to channel: `/`


### SEND `/delete` Operation

* Operation ID: `sendDELETE`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"DELETE"` | - | - |


### RECEIVE `/delete` Operation

* Operation ID: `receiveDELETE`
* Available only on servers: [httpbin.org](#httpbinorg-server)


### SEND `/get` Operation

* Operation ID: `sendGET`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"GET"` | - | - |


### RECEIVE `/get` Operation

* Operation ID: `receiveGET`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"GET"` | - | - |


### SEND `/post` Operation

* Operation ID: `sendPOST`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"POST"` | - | - |


### RECEIVE `/post` Operation

* Operation ID: `receivePOST`
* Available only on servers: [httpbin.org](#httpbinorg-server)


### SEND `/patch` Operation

* Operation ID: `sendPATCH`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"PATCH"` | - | - |


### RECEIVE `/patch` Operation

* Operation ID: `receivePATCH`
* Available only on servers: [httpbin.org](#httpbinorg-server)


### SEND `/put` Operation

* Operation ID: `sendPUT`
* Available only on servers: [httpbin.org](#httpbinorg-server)

#### `http` Operation specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| method | - | - | `"PUT"` | - | - |


### RECEIVE `/put` Operation

* Operation ID: `receivePUT`
* Available only on servers: [httpbin.org](#httpbinorg-server)


