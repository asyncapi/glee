import { Kafka } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'
import ip from 'ip'

class KafkaAdapter extends Adapter {
  private firstConnect: boolean = true
  producer: any
  name(): string {
    return 'Kafka adapter'
  }

  async connect() {
    const brokerUrl = this.AsyncAPIServer.url()
    const host = process.env.HOST_IP || ip.address()
   
    const kafka = new Kafka({
      clientId: 'glee-app',  // clientID: hardcoded need to change afterwards 
      brokers: [`${host}:9092`, `${host}:9097`, `${host}:9100`],
    })

    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'test-topic',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
    await producer.disconnect()

    const consumer = kafka.consumer({ groupId: 'glee-group' })   // groupID: hardcoded need to change afterwards
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

    const run = async () => {
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

    run().catch(console.error)
    await consumer.disconnect()
  }
}

export default KafkaAdapter
