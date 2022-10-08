import fs from 'fs'
import { Kafka, Consumer } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'


class KafkaAdapter extends Adapter {
  private kafka: Kafka
  private firstConnect: boolean = true
  name(): string {
    return 'Kafka adapter'
  }

  async connect() {
    const broker = this.AsyncAPIServer.url()
    this.kafka = new Kafka({
      clientId: 'glee-app',  // clientID: hardcoded need to change afterwards 
      brokers: [broker],
    })
    const consumer = this.kafka.consumer({ groupId: 'glee-group' })   // groupID: hardcoded need to change afterwards
    consumer.on('consumer.connect', () => {
      if (this.firstConnect) {
        this.firstConnect = false
        this.emit('connect', {
          name: this.name(),
          adapter: this,
          connection: consumer,
          channels: this.channelNames
        })
      }
    })

    await consumer.connect()
    
    const subscribedChannels = this.getSubscribedChannels()
    await consumer.subscribe({ topics: subscribedChannels, fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    })
  }

  async send (message: GleeMessage) {
    return this._send(message)
  }

  // async _connect() {  
  //     const serverBinding = this.AsyncAPIServer.binding('Kafka')
  //     const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
  //       const secName = Object.keys(sec.json())[0]
  //       return this.parsedAsyncAPI.components().securityScheme(secName)
  //     })
  //     const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
  //     const X509SecurityReq = securityRequirements.find(sec => sec.type() === 'X509')
  //     const url = new URL(this.AsyncAPIServer.url())

  //     const certsConfig = process.env.GLEE_SERVER_CERTS?.split(',').map(t => t.split(':'))
  //     const certs = certsConfig?.filter(tuple => tuple[0] === this.serverName)?.map(t => fs.readFileSync(t[1])) // eslint-disable-line security/detect-non-literal-fs-filename

  //     this.kafkaConsumer = Kafka.connect({
  //       host: url.host,
  //       port: url.port || (url.protocol === 'kafka:' ? 1883 : 8883),
  //       protocol: url.protocol.substr(0, url.protocol.length - 1),
  //       clientId: serverBinding && serverBinding.clientId,
  //       clean: serverBinding && serverBinding.cleanSession,
  //       will: serverBinding && serverBinding.will && {
  //         topic: serverBinding && serverBinding.lastWill && serverBinding.lastWill.topic ? serverBinding.lastWill.topic : undefined,
  //         qos: serverBinding && serverBinding.lastWill && serverBinding.lastWill.qos ? serverBinding.lastWill.qos : undefined,
  //         payload: serverBinding && serverBinding.lastWill && serverBinding.lastWill.message ? serverBinding.lastWill.message : undefined,
  //         retain: serverBinding && serverBinding.lastWill && serverBinding.lastWill.retain ? serverBinding.lastWill.retain : undefined,
  //       },
  //       keepalive: serverBinding && serverBinding.keepAlive,
  //       username: userAndPasswordSecurityReq ? process.env.GLEE_USERNAME : undefined,
  //       password: userAndPasswordSecurityReq ? process.env.GLEE_PASSWORD : undefined,
  //       ca: X509SecurityReq ? certs : undefined,
  //     })

  //     this.kafka.on('connect', () => {
        

  //       if (Array.isArray(subscribedChannels)) {
  //         subscribedChannels.forEach((topic) => {
  //           const operation = this.parsedAsyncAPI.channel(channel).publish()
  //           const binding = operation.binding('mqtt')
  //           this.kafka.subscribe(channel, {
  //             qos: binding && binding.qos ? binding.qos : 0,
  //           })
  //         })
  //       }

  //       resolve(this)
  //     })

  //     this.kafka.on('message', (topic, partition, message) => {
  //       const msg = this._createMessage(message as IPublishPacket)
  //       this.emit('message', msg, this.kafka)
  //     })

  //     this.kafka.on('reconnect', () => {
  //       this.emit('reconnect', {
  //         connection: this.kafka,
  //         channels: this.channelNames,
  //       })
  //     })
      
  //     this.kafka.on('close', () => {
  //       this.emit('close', {
  //         connection: this.kafka,
  //         channels: this.channelNames,
  //       })
  //     })

  //     this.kafka.on('error', (error) => {
  //       this.emit('error', error)
  //     })
  // }

  _send(message: GleeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      // const producer = kafka.producer()
      // await producer.connect()
      // await producer.send({
      //   topic: 'glee-topic',
      //   messages: [
      //     { value: 'Hello KafkaJS user!' }, //pass a key-value pair
      //   ],
      // })
      // await producer.disconnect()

      // const operation = this.parsedAsyncAPI.channel(message.channel).subscribe()
      // const binding = operation ? operation.binding('kafka') : undefined
      // this.kafka.publish(message.channel, message.payload, {
      //   qos: binding && binding.qos ? binding.qos : 2,
      //   retain: binding && binding.retain ? binding.retain : false
      // }, (err) => {
      //   if (err) {
      //     reject(err)
      //     return
      //   }

      //   resolve()
      // })
    })
  }

  // _createMessage(packet: IPublishPacket): GleeMessage {
    // pass key-value pair inside the headers
    // const headers: IMQTTHeaders = {
    //   cmd: packet.cmd,
    //   retain: packet.retain,
    //   qos: packet.qos,
    //   dup: packet.dup,
    //   length: packet.length
    // }

    // return new GleeMessage({
    //   payload: packet.payload,
    //   channel: packet.topic,
    // })
  // }
}

export default KafkaAdapter
