import mqtt, { IPublishPacket, MqttClient, QoS } from 'mqtt'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import { MqttAuthConfig, MqttAdapterConfig } from '../../lib/index.js'
import { SecuritySchemesInterface as SecurityScheme } from '@asyncapi/parser'
import { logLineWithIcon } from '../../lib/logger.js'

interface IMQTTHeaders {
  cmd?: string
  retain?: boolean
  qos: QoS
  dup: boolean
  length: number
}

interface ClientData {
  url?: URL
  auth?: MqttAuthConfig
  serverBinding?: any
  protocolVersion?: number
  userAndPasswordSecurityReq?: SecurityScheme
  X509SecurityReq?: SecurityScheme
}

const MQTT_UNSPECIFIED_ERROR_REASON = 0x80
const MQTT_SUCCESS_REASON = 0
enum SecurityTypes {
  USER_PASSWORD = 'userpassword',
  X509 = 'x509',
}
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
    let userAndPasswordSecurityReq
    let X509SecurityReq

    const securityRequirements = this.AsyncAPIServer.security().map((e) =>
      e.all().map((e) => e.scheme())
    )

    securityRequirements.forEach((security) => {
      for (const sec of security) {
        const securityType = sec.type().toLocaleLowerCase()
        switch (securityType) {
          case SecurityTypes.USER_PASSWORD:
            userAndPasswordSecurityReq = sec
            break
          case SecurityTypes.X509:
            X509SecurityReq = sec
            break
          default:
            this.emit(
              'error',
              new Error(
                `Invalid security type '${securityType}' specified for server '${this.serverName
                }'. Please double-check your configuration to ensure you're using a supported security type. Here is a list of supported types: ${Object.values(
                  SecurityTypes
                )}`
              )
            )
        }
      }
    })

    return {
      userAndPasswordSecurityReq,
      X509SecurityReq,
    }
  }

  private async initializeClient(data: ClientData) {
    const {
      url,
      auth,
      serverBinding,
      protocolVersion,
      userAndPasswordSecurityReq,
      X509SecurityReq,
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
        retain: serverBinding?.lastWill?.retain,
      },
      keepalive: serverBinding?.keepAlive,
      username: userAndPasswordSecurityReq ? auth?.username : undefined,
      password: userAndPasswordSecurityReq ? auth?.password : undefined,
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
        channels: this.channelNames.map((channelName) =>
          this.parsedAsyncAPI.channels().get(channelName).address()
        ),
      })
    })

    this.client.on('error', (error) => {
      this.emit('error', error)
    })

    this.client.on('message', (channel, message, mqttPacket) => {
      const qos = mqttPacket.qos
      if (protocolVersion === 5 && qos > 0) return // ignore higher qos messages. already processed

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
      const asyncAPIChannel = this.parsedAsyncAPI.channels().get(channel)
      const receiveOperations = asyncAPIChannel.operations().filterByReceive()
      if (receiveOperations.length > 1) {
        this.emit('error', new Error(`Channel ${channel} has more than one receive operation. Please make sure you have only one.`))
        return
      }
      const binding = asyncAPIChannel.operations().filterByReceive()[0].bindings().get('mqtt')?.value()
      const topic = asyncAPIChannel.address()
      this.client.subscribe(
        topic,
        {
          qos: binding?.qos ? binding.qos : 0,
        },
        (err, granted) => {
          if (err) {
            logLineWithIcon(
              'x',
              `Error while trying to subscribe to \`${topic}\` topic.`,
              {
                highlightedWords: [topic],
                iconColor: '#f00',
                disableEmojis: true,
              }
            )
            console.log(err.message)
            return
          }
          granted.forEach(({ topic, qos }) => {
            logLineWithIcon(
              ':zap:',
              `Subscribed to \`${topic}\` topic with QoS ${qos}`,
              {
                highlightedWords: [topic, qos.toString()],
              }
            )
          })
        }
      )
    })
  }

  async _connect(): Promise<this> {
    const mqttOptions: MqttAdapterConfig = await this.resolveProtocolConfig(
      'mqtt'
    )
    const auth: MqttAuthConfig = await this.getAuthConfig(mqttOptions?.auth)
    const subscribedChannels = this.getSubscribedChannels()
    const mqttServerBinding = this.AsyncAPIServer.bindings().get('mqtt')
    const mqtt5ServerBinding = this.AsyncAPIServer.bindings().get('mqtt5')

    const { userAndPasswordSecurityReq, X509SecurityReq } =
      this.getSecurityReqs()

    const url = new URL(this.AsyncAPIServer.url())

    const protocolVersion = parseInt(
      this.AsyncAPIServer.protocolVersion() || '4'
    )
    const serverBinding =
      protocolVersion === 5 ? mqtt5ServerBinding : mqttServerBinding

    this.client = await this.initializeClient({
      url,
      auth,
      serverBinding,
      protocolVersion,
      userAndPasswordSecurityReq,
      X509SecurityReq,
    })

    await this.listenToEvents({ protocolVersion })

    const connectClient = (): Promise<this> => {
      return new Promise((resolve) => {
        this.client.on('connect', (connAckPacket) => {
          const isSessionResume = connAckPacket.sessionPresent

          if (!this.firstConnect) {
            this.checkFirstConnect()
          }

          const shouldSubscribe =
            !isSessionResume && Array.isArray(subscribedChannels)

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
      const channel = this.parsedAsyncAPI.channels().get(message.channel)
      const address = channel.address()
      const binding = channel.bindings().get('mqtt')?.value()
      this.client.publish(
        address,
        message.payload,
        {
          qos: binding?.qos ? binding.qos : 2,
          retain: binding?.retain ? binding.retain : false,
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
    const id = this.parsedAsyncAPI.channels().all().filter(channel => channel.address() === packet.topic)[0]?.id()
    return new GleeMessage({
      payload: packet.payload,
      headers,
      channel: id,
    })
  }

  _customAckHandler(channel, message, mqttPacket, done) {
    const msg = this._createMessage(mqttPacket as IPublishPacket)

    msg.on('processing:successful', () => done(MQTT_SUCCESS_REASON))
    msg.on('processing:failed', () => done(MQTT_UNSPECIFIED_ERROR_REASON))

    this.emit('message', msg, this.client)
  }
}

export default MqttAdapter
