import mqtt, { IPublishPacket, MqttClient, QoS } from 'mqtt'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import { MqttAuthConfig, MqttAdapterConfig } from '../../lib/index.js'
import { SecurityScheme } from '@asyncapi/parser';

interface IMQTTHeaders {
  cmd?: string;
  retain?: boolean;
  qos: QoS;
  dup: boolean;
  length: number;
}

interface ClientData {
  url?: URL,
  auth?: MqttAuthConfig,
  serverBinding?: any,
  protocolVersion?: number,
  userAndPasswordSecurityReq?: SecurityScheme,
  X509SecurityReq?: SecurityScheme
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

  private getSecurityReqs() {
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
    
    return {
      userAndPasswordSecurityReq,
      X509SecurityReq
    }

  }
  
  private async initializeClient(data: ClientData) {

    const {
      url,
      auth,
      serverBinding,
      protocolVersion,
      userAndPasswordSecurityReq,
      X509SecurityReq
    } = data


    return mqtt.connect({
      host: url.hostname,
      port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
      protocol: url.protocol.slice(0, url.protocol.length - 1),
      clientId: serverBinding?.clientId ?? auth?.clientId,
      clean: serverBinding?.cleanSession,
      will: serverBinding?.will && {
        topic: serverBinding?.lastWill?.topic,
        qos: serverBinding?.lastWill?.qos,
        payload: serverBinding?.lastWill?.message,
        retain: serverBinding?.lastWill?.retain
      },
      keepalive: serverBinding?.keepAlive,
      username: userAndPasswordSecurityReq
        ? auth?.username
        : undefined,
      password: userAndPasswordSecurityReq
        ? auth?.password
        : undefined,
      ca: X509SecurityReq ? auth?.cert : undefined,
      protocolVersion,
      customHandleAcks: this._customAckHandler.bind(this),
    } as any)
  }

  private async listenToEvents(data: ClientData) {

    const { protocolVersion } = data

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
  }

  private checkFirstConnect() {
    this.firstConnect = true
    this.emit('connect', {
      name: this.name(),
      adapter: this,
      connection: this.client,
      channels: this.channelNames,
    })
  }

  private subscribe(channels: string[]) {
    channels.forEach((channel) => {
      const operation = this.parsedAsyncAPI.channel(channel).publish()
      const binding = operation.binding('mqtt')
      this.client.subscribe(channel, {
        qos: binding && binding.qos ? binding.qos : 0,
      })
    })
  }

  async _connect(): Promise<this> {
    const mqttOptions: MqttAdapterConfig  = await this.resolveProtocolConfig('mqtt')
    const auth: MqttAuthConfig = await this.getAuthConfig(mqttOptions.auth)
    const subscribedChannels = this.getSubscribedChannels()
    const mqttServerBinding = this.AsyncAPIServer.binding('mqtt')
    const mqtt5ServerBinding = this.AsyncAPIServer.binding('mqtt5')

    const { userAndPasswordSecurityReq, X509SecurityReq } = this.getSecurityReqs()

    const url = new URL(this.AsyncAPIServer.url())

    const protocolVersion = parseInt(this.AsyncAPIServer.protocolVersion() || '4')
    const serverBinding = protocolVersion === 5 ? mqtt5ServerBinding : mqttServerBinding

    this.client = await this.initializeClient({
      url,
      auth,
      serverBinding,
      protocolVersion,
      userAndPasswordSecurityReq,
      X509SecurityReq
    })

    await this.listenToEvents({ protocolVersion })

    const connectClient = (): Promise<this> => {
      return new Promise((resolve) => {
        this.client.on('connect', connAckPacket => {
          const isSessionResume = connAckPacket.sessionPresent

          if (!this.checkFirstConnect) {
            this.firstConnect = true
            this.emit('connect', {
              name: this.name(),
              adapter: this,
              connection: this.client,
              channels: this.channelNames,
            })
          }

          const shouldSubscribe = !isSessionResume && Array.isArray(subscribedChannels)

          if (shouldSubscribe) {
            this.subscribe(subscribedChannels)
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

  _customAckHandler(channel, message, mqttPacket, done) {
    const msg = this._createMessage(mqttPacket as IPublishPacket)
    console.log('Hello World')

    msg.on('processing:successful', () => done(MQTT_SUCCESS_REASON))
    msg.on('processing:failed', () => done(MQTT_UNSPECIFIED_ERROR_REASON))

    this.emit('message', msg, this.client)
  }
}

export default MqttAdapter
