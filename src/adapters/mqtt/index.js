import fs from 'fs'
import mqtt from 'mqtt'
import Adapter from '../../lib/adapter.js'
import Message from '../../lib/message.js'

class MqttAdapter extends Adapter {
  name () {
    return 'MQTT adapter'
  }

  async connect () {
    return this._connect()
  }

  async send (message) {
    return this._send(message)
  }

  _connect () {
    return new Promise((resolve) => {
      const channelNames = this.parsedAsyncAPI.channelNames()
      const subscribedChannels = channelNames.filter(chan => this.parsedAsyncAPI.channel(chan).hasPublish())
      const serverBinding = this.AsyncAPIServer.binding('mqtt')
      const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
        const secName = Object.keys(sec.json())[0]
        return this.parsedAsyncAPI.components().securityScheme(secName)
      })
      const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
      const url = new URL(this.AsyncAPIServer.url())

      const certsConfig = process.env.GLEE_SERVER_CERTS?.split(',').map(t => t.split(':'))
      const certs = certsConfig?.filter(tuple => tuple[0] === this.serverName)?.map(t => fs.readFileSync(t[1]))

      this.client = mqtt.connect({
        host: url.host,
        port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
        protocol: url.protocol.substr(0, url.protocol.length - 1),
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
        ca: certs,
      })

      this.client.handleMessage = (packet, callback) => {
        this.glee.once('message:processed', (err, msg) => {
          if (err) {
            console.error(err.message)
            return callback(err)
          }
          callback()
        })
      }

      this.client.on('connect', () => {
        if (!this.firstConnect) {
          this.firstConnect = true
          this.emit('connect', { name: this.name(), adapter: this, connection: this.client, channels: channelNames })
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
        const msg = this._createMessage(mqttPacket)
        this.emit('message', msg, this.client)
      })

      this.client.on('reconnect', () => {
        this.emit('reconnect', {
          connection: this.client,
          channels: channelNames,
        })
      })
      
      this.client.on('close', () => {
        this.emit('close', {
          connection: this.client,
          channels: channelNames,
        })
      })

      this.client.on('error', (error) => {
        this.emit('error', error)
      })
    })
  }

  _send (message) {
    return new Promise((resolve, reject) => {
      const operation = this.parsedAsyncAPI.channel(message.channel).subscribe()
      const binding = operation ? operation.binding('mqtt') : undefined
      this.client.publish(message.channel, message.payload, {
        qos: binding && bindng.qos ? bindng.qos : 2,
        retain: binding && bindng.retain ? bindng.retain : false
      }, (err) => {
        if (err) {
          reject(err)
          return
        }

        resolve()
      })
    })
  }

  _createMessage (packet) {
    const { payload, topic, ...headers } = packet

    return new Message({
      payload,
      headers,
      channel: topic,
    })
  }
}

export default MqttAdapter
