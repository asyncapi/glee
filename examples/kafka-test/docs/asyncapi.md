# Kafka test 1 documentation


## Table of Contents

* [Servers](#servers)
  * [mykafka](#mykafka-server)

## Servers

### `mykafka` Server

* URL: `kafka-secure://kafka://pkc-6ojv2.us-west4.gcp.confluent.cloud:9092/`
* Protocol: `kafka-secure`


#### Security

##### Security Requirement 1

* Type: `ScramSha256`
  * security.protocol: SASL_SSL
  * sasl.mechanism: SCRAM-SHA-256




##### Security Requirement 2

* Type: `ScramSha256`
  * security.protocol: SASL_SSL
  * sasl.mechanism: SCRAM-SHA-256







## Operations

### REQUEST `undefined` Operation

*Publish messages to Test channel.*

* Operation ID: `onTest`

#### Message `testMessage`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| test | string | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "test": "string"
}
```


#### Request information

*  should be done to channel: ``
#### Operation reply address information

* Operation reply address location: `$message.header#/replyTo`



### RECEIVE `undefined` Operation

*Recieve messages from Produce channel.*

* Operation ID: `onProduce`

#### Message `produceMessage`

##### Payload

| Name | Type | Description | Value | Constraints | Notes |
|---|---|---|---|---|---|
| (root) | object | - | - | - | **additional properties are allowed** |
| test | string | - | - | - | - |

> Examples of payload _(generated)_

```json
{
  "test": "string"
}
```



