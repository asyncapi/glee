const mqtt = require('mqtt')
const Adapter = require('../../lib/adapter')
const Message = require('../../lib/message')
const config = require('../../lib/config')

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
      const securityRequirements = this.AsyncAPIServer.security().map(sec => {
        const secName = Object.keys(sec.json())[0]
        return this.parsedAsyncAPI.components().securityScheme(secName)
      })
      const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
      const url = new URL(this.AsyncAPIServer.url())

      this.client = mqtt.connect({
        host: url.host,
        port: url.port || (url.protocol === 'mqtt:' ? 1883 : 8883),
        protocol: url.protocol.substr(0, url.protocol.length - 1),
        clientId: serverBinding.clientId,
        clean: serverBinding.cleanSession,
        will: {
          topic: serverBinding.lastWill.topic,
          qos: serverBinding.lastWill.qos,
          payload: serverBinding.lastWill.message,
          retain: serverBinding.lastWill.retain,
        },
        keepalive: serverBinding.keepAlive,
        username: userAndPasswordSecurityReq ? config.USERNAME : undefined,
        password: userAndPasswordSecurityReq ? config.PASSWORD : undefined
      })

      this.client.on('connect', () => {
        this.emit('connect', { name: 'MQTT adapter', adapter: this })

        if (Array.isArray(subscribedChannels)) {
          subscribedChannels.forEach((channel) => {
            const operation = this.parsedAsyncAPI.channel(channel).publish()
            const binding = operation.binding('mqtt')
            this.client.subscribe(channel, {
              qos: binding && binding.qos ? binding.qos : 0,
            })
          })
        }

        this.client.on('message', (channel, message, packet) => {
          const msg = this._createMessage(packet)
          this.emit('message', msg)
        })

        resolve(this)
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
        qos: binding && bindng.qos ? bindng.qos : 0,
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
    const headers = {
      cmd: packet.cmd,
      retain: packet.retain,
      qos: packet.qos,
      dup: packet.dup,
      length: packet.length
    }

    return new Message(this.evolve, packet.payload, headers, packet.topic)
  }
}

module.exports = MqttAdapter
