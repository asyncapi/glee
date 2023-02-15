import mqtt, { IPublishPacket, MqttClient, QoS } from 'mqtt'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import { MqttAuthConfig } from '../../lib/index.d'
import { resolveFunctions } from '../../lib/util.js'

interface IMQTTHeaders {
  cmd?: string;
  retain?: boolean;
  qos: QoS;
  dup: boolean;
  length: number;
}

const MQTT_UNSPECIFIED_ERROR_REASON = 0x80
const MQTT_SUCCESS_REASON = 0

class MqttAdapter extends Adapter {
  private client: MqttClient
  private firstConnect: boolean

  name(): string {
    return 'MQTT adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage) {
    return this._send(message)
  }

  async _connect(): Promise<this> { // NOSONAR
    const mqttOptions: MqttAuthConfig = await this.resolveAuthConfig()
    const subscribedChannels = this.getSubscribedChannels()
    const mqttServerBinding = this.AsyncAPIServer.binding('mqtt')
    const mqtt5ServerBinding = this.AsyncAPIServer.binding('mqtt5')
    const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
      const secName = Object.keys(sec.json())[0]
      return this.parsedAsyncAPI.components().securityScheme(secName)
    }
    )
    const userAndPasswordSecurityReq = securityRequirements.find(
      (sec) => sec.type() === 'userPassword'
    )
    const X509SecurityReq = securityRequirements.find(
      (sec) => sec.type() === 'X509'
    )
    const url = new URL(this.AsyncAPIServer.url())

    const protocolVersion = parseInt(this.AsyncAPIServer.protocolVersion() || '4')
    const serverBinding = protocolVersion === 5 ? mqtt5ServerBinding : mqttServerBinding

    this.client = mqtt.connect({
      host: url.host,
      port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
      protocol: url.protocol.slice(0, url.protocol.length - 1),
      clientId: serverBinding?.clientId ?? mqttOptions?.clientId,
      clean: serverBinding?.cleanSession,
      will: serverBinding?.will && {
        topic: serverBinding?.lastWill?.topic,
        qos: serverBinding?.lastWill?.qos,
        payload: serverBinding?.lastWill?.message,
        retain: serverBinding?.lastWill?.retain
      },
      keepalive: serverBinding?.keepAlive,
      username: userAndPasswordSecurityReq
        ? mqttOptions?.username
        : undefined,
      password: userAndPasswordSecurityReq
        ? mqttOptions?.password
        : undefined,
      ca: X509SecurityReq ? mqttOptions?.cert : undefined,
      protocolVersion,
      customHandleAcks: this._customAckHandler.bind(this),
    } as any)

    this.client.on('close', () => {
      this.emit('close', {
        connection: this.client,
        channels: this.channelNames,
      })
    })

    this.client.on('error', (error) => {
      this.emit('error', error)
    })

    this.client.on('message', (channel, message, mqttPacket) => {
      const qos = mqttPacket.qos
      if (protocolVersion === 5 && qos > 0) return   // ignore higher qos messages. already processed

      const msg = this._createMessage(mqttPacket as IPublishPacket)
      this.emit('message', msg, this.client)
    })

    const connectClient = (): Promise<this> => {
      return new Promise((resolve) => {
        this.client.on('connect', connAckPacket => {
          const isSessionResume = connAckPacket.sessionPresent

          if (!this.firstConnect) {
            this.firstConnect = true
            this.emit('connect', {
              name: this.name(),
              adapter: this,
              connection: this.client,
              channels: this.channelNames,
            })
          }

          if (!isSessionResume && Array.isArray(subscribedChannels)) {
            subscribedChannels.forEach((channel) => {
              const operation = this.parsedAsyncAPI.channel(channel).publish()
              const binding = operation.binding('mqtt')
              this.client.subscribe(channel, {
                qos: binding && binding.qos ? binding.qos : 0,
              })
            })
          }

          resolve(this)
        })
      })
    }

    return connectClient()

  }

  _send(message: GleeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const operation = this.parsedAsyncAPI
        .channel(message.channel)
        .subscribe()
      const binding = operation ? operation.binding('mqtt') : undefined
      this.client.publish(
        message.channel,
        message.payload,
        {
          qos: binding && binding.qos ? binding.qos : 2,
          retain: binding && binding.retain ? binding.retain : false,
        },
        (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve()
        }
      )
    })
  }

  _createMessage(packet: IPublishPacket): GleeMessage {
    const headers: IMQTTHeaders = {
      cmd: packet.cmd,
      retain: packet.retain,
      qos: packet.qos,
      dup: packet.dup,
      length: packet.length,
    }

    return new GleeMessage({
      payload: packet.payload,
      headers,
      channel: packet.topic,
    })
  }

  private async resolveAuthConfig() {
    const auth = this.glee.options?.mqtt?.auth
    if (!auth) return undefined
    if (typeof auth !== 'function') {
      await resolveFunctions(auth)
      return auth
    }

    return await auth({ serverName: this.serverName, parsedAsyncAPI: this.parsedAsyncAPI })
  }

  _customAckHandler(channel, message, mqttPacket, done) {
    const msg = this._createMessage(mqttPacket as IPublishPacket)
    console.log('Hello World')

    msg.on('processing:successful', () => done(MQTT_SUCCESS_REASON))
    msg.on('processing:failed', () => done(MQTT_UNSPECIFIED_ERROR_REASON))

    this.emit('message', msg, this.client)
  }
}

export default MqttAdapter
