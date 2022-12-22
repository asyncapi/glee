import { Kafka } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'

class KafkaAdapter extends Adapter {
  private firstConnect: boolean = true
  name(): string {
    return 'Kafka adapter'
  }
 
  async connect() {
    const brokerUrl = new URL(this.AsyncAPIServer.url())
    const kafka: Kafka = new Kafka({
      clientId: 'glee-app',  // clientID: hardcoded need to change afterwards 
      brokers: [brokerUrl.host],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
      },
    })

    const consumer = kafka.consumer({ groupId: 'glee-group' })   // groupID: hardcoded need to change afterwards

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
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: message.channel,
      messages: [{
        key: message.key,
        value: message.payload,
        offset: message.offset,
        timestamp: message.timestamp,
        headers:{} 
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