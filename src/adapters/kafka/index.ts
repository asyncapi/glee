import { Kafka, Consumer, Producer } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'

class KafkaAdapter extends Adapter {
  private firstConnect: boolean = true
  producer: any
  name(): string {
    return 'Kafka adapter'
  }
 
  async connect() {
    const brokerUrl = new URL(this.AsyncAPIServer.url())
    // kafka client
    const kafka = new Kafka({
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
    const producer = kafka.producer();
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
    await producer.connect();
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const gleemessage = new GleeMessage({
          // topic: topic,
          // partition: partition,
          // value: message.value.toString(),
          // key: message.key,
          // offset: message.offset,
          // timestamp: message.timestamp,
          // headers: message.headers,
        });
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)

        gleemessage.send();
      },
    })
  }
}

export default KafkaAdapter