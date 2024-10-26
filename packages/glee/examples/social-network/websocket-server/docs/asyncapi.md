# The Social Network 0.1.0 documentation


## Table of Contents

* [Servers](#servers)
  * [websockets](#websockets-server)
  * [mosquitto](#mosquitto-server)
* [Operations](#operations)
  * [PUB /](#pub--operation)
  * [SUB /](#sub--operation)
  * [SUB post/liked](#sub-postliked-operation)

## Servers

### `websockets` Server

* URL: `ws://0.0.0.0:3001`
* Protocol: `ws`



### `mosquitto` Server

* URL: `mqtt://test.mosquitto.org`
* Protocol: `mqtt`


#### `mqtt` Server specific information

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| clientId | - | - | `"the-social-network"` | - | - |


## Operations

### PUB `/` Operation

* Operation ID: `onLikeDislike`
* Available only on servers: [websockets](#websockets-server)

#### Message `likeOrDislike`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| type | string | Type of the message | allowed (`"like"`, `"dislike"`) | - | **required** |
| data | object | - | - | - | **additional properties are allowed** |
| data.postId | integer | The id of the post the user (dis)liked. | - | - | **required** |
| data.userId | integer | The user who clicked the Like button. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "type": "like",
  "data": {
    "postId": 0,
    "userId": 0
  }
}
```



### SUB `/` Operation

* Available only on servers: [websockets](#websockets-server)

#### Message `likeCountUpdated`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| type | string | Type of the message | - | - | **required** |
| data | object | - | - | - | **additional properties are allowed** |
| data.postId | integer | The id of the post which likes count has been updated. | - | - | **required** |
| data.totalCount | integer | The number of likes for this post. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "type": "string",
  "data": {
    "postId": 0,
    "totalCount": 0
  }
}
```



### SUB `post/liked` Operation

* Available only on servers: [mosquitto](#mosquitto-server)

#### Message `notifyPostLiked`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are NOT allowed** |
| postId | integer | The id of the post that has been liked. | - | - | **required** |
| userId | integer | The user who liked the post. | - | - | **required** |

> Examples of payload _(generated)_

```json
{
  "postId": 0,
  "userId": 0
}
```



