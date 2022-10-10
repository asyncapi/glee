import fs from 'fs'
import mqtt, { IPublishPacket, MqttClient, QoS } from 'mqtt'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'

interface IMQTTHeaders {
  cmd?: string,
  retain?: boolean,
  qos: QoS,
  dup: boolean,
  length: number,
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

  async send (message: GleeMessage) {
    return this._send(message)
  }

  _connect(): Promise<this> {
    return new Promise((resolve) => {
      const subscribedChannels = this.getSubscribedChannels()
      const serverBinding = this.AsyncAPIServer.binding('mqtt')
      const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
        const secName = Object.keys(sec.json())[0]
        return this.parsedAsyncAPI.components().securityScheme(secName)
      })
      const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
      const X509SecurityReq = securityRequirements.find(sec => sec.type() === 'X509')
      const url = new URL(this.AsyncAPIServer.url())

      const certsConfig = process.env.GLEE_SERVER_CERTS?.split(',').map(t => t.split(':'))
      const certs = certsConfig?.filter(tuple => tuple[0] === this.serverName)?.map(t => fs.readFileSync(t[1])) // eslint-disable-line security/detect-non-literal-fs-filename

      this.client = mqtt.connect({
        host: url.host,
        port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
        protocol: url.protocol.slice(0, url.protocol.length - 1),
        clientId: serverBinding && serverBinding.clientId,
        clean: serverBinding && serverBinding.cleanSession,
        will: serverBinding && serverBinding.will && {
          topic: serverBinding && serverBinding.lastWill && serverBinding.lastWill.topic ? serverBinding.lastWill.topic : undefined,
          qos: serverBinding && serverBinding.lastWill && serverBinding.lastWill.qos ? serverBinding.lastWill.qos : undefined,
          payload: serverBinding && serverBinding.lastWill && serverBinding.lastWill.message ? serverBinding.lastWill.message : undefined,
          retain: serverBinding && serverBinding.lastWill && serverBinding.lastWill.retain ? serverBinding.lastWill.retain : undefined,
        },
        keepalive: serverBinding && serverBinding.keepAlive,
        username: userAndPasswordSecurityReq ? process.env.GLEE_USERNAME : undefined,
        password: userAndPasswordSecurityReq ? process.env.GLEE_PASSWORD : undefined,
        ca: X509SecurityReq ? certs : undefined,
      } as any)

      this.client.on('connect', () => {
        if (!this.firstConnect) {
          this.firstConnect = true
          this.emit('connect', { name: this.name(), adapter: this, connection: this.client, channels: this.channelNames })
        }

        if (Array.isArray(subscribedChannels)) {
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

      this.client.on('message', (channel, message, mqttPacket) => {
        const msg = this._createMessage(mqttPacket as IPublishPacket)
        this.emit('message', msg, this.client)
      })

      this.client.on('reconnect', () => {
        this.emit('reconnect', {
          connection: this.client,
          channels: this.channelNames,
        })
      })
      
      this.client.on('close', () => {
        this.emit('close', {
          connection: this.client,
          channels: this.channelNames,
        })
      })

      this.client.on('error', (error) => {
        this.emit('error', error)
      })
    })
  }

  _send(message: GleeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const operation = this.parsedAsyncAPI.channel(message.channel).subscribe()
      const binding = operation ? operation.binding('mqtt') : undefined
      this.client.publish(message.channel, message.payload, {
        qos: binding && binding.qos ? binding.qos : 2,
        retain: binding && binding.retain ? binding.retain : false
      }, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  _createMessage(packet: IPublishPacket): GleeMessage {
    const headers: IMQTTHeaders = {
      cmd: packet.cmd,
      retain: packet.retain,
      qos: packet.qos,
      dup: packet.dup,
      length: packet.length
    }

    return new GleeMessage({
      payload: packet.payload,
      headers,
      channel: packet.topic,
    })
  }
}

export default MqttAdapter
