import fs from 'fs'
import { Kafka } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'

class KafkaAdapter extends Adapter {
  private kafka: Kafka
  private firstConnect: boolean = true
  name(): string {
    return 'Kafka adapter'
  }
 
  async connect() {
    const brokerUrl = new URL(this.AsyncAPIServer.url())
    this.kafka = new Kafka({
      clientId: 'glee-app',  // clientID: hardcoded need to change afterwards 
      brokers: [brokerUrl.host],
      ssl: {
        rejectUnauthorized: true,
        ca: [fs.readFileSync('ca.pem')],
        key: fs.readFileSync('client.key'),
        cert: fs.readFileSync('client.pem')
      },
      sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      },
    })

    const securityRequirements = (this.AsyncAPIServer.security() || []).map(sec => {
      const secName = Object.keys(sec.json())[0]
      return this.parsedAsyncAPI.components().securityScheme(secName)
    })
    const userAndPasswordSecurityReq = securityRequirements.find(sec => sec.type() === 'userPassword')
    const X509SecurityReq = securityRequirements.find(sec => sec.type() === 'X509')
    const url = new URL(this.AsyncAPIServer.url())

    const certsConfig = process.env.GLEE_SERVER_CERTS?.split(',').map(t => t.split(':'))
    const certs = certsConfig?.filter(tuple => tuple[0] === this.serverName)?.map(t => fs.readFileSync(t[1]))
    

    const consumer = this.kafka.consumer({ groupId: 'glee-group' })   // groupID: hardcoded need to change afterwards
    consumer.on('consumer.connect', () => {
      if (this.firstConnect) {
        this.firstConnect = false
        this.emit('connect', {
          name: this.name(),
          adapter: this,
          connection: consumer,
          channels: this.getSubscribedChannels()
        })
      }
    })
    await consumer.connect() 
    const subscribedChannels = this.getSubscribedChannels()
    await consumer.subscribe({ topics: subscribedChannels, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const msg = this._createMessage(topic, partition, message)
        this.emit('message', msg, consumer)
      },
    })
  }

  async send(message: GleeMessage) {
    const producer = this.kafka.producer()
    await producer.connect()
    await producer.send({
      topic: message.channel,
      messages: [{
        key: message.key,
        value: message.payload,
        timestamp: message.timestamp,
      }],
    })
    await producer.disconnect()
  }

  _createMessage(topic, partition, message) {
    return new GleeMessage({
      channel: topic,
      payload: message.value,
      headers: {
        partition,
        key: message.key,
        offset: message.offset,
        timestamp: message.timestamp,
        ...message.headers,
      },
    })
  }
}

export default KafkaAdapter