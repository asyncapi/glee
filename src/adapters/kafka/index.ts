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
    const kafkaOptions = await this.resolveProtocolConfig('kafka')
    const securityRequirements = (this.AsyncAPIServer.security() || []).map(
      (sec) => {
        const secName = Object.keys(sec.json())[0]
        return this.parsedAsyncAPI.components().securityScheme(secName)
      }
    )
    const userAndPasswordSecurityReq = securityRequirements.find(
      (sec) => sec.type() === 'userPassword'
    )
    const scramSha256SecurityReq = securityRequirements.find(
      (sec) => sec.type() === 'scramSha256'
    )
    const scramSha512SecurityReq = securityRequirements.find(
      (sec) => sec.type() === 'scramSha512'
    )
  
    const brokerUrl = new URL(this.AsyncAPIServer.url())
    this.kafka = new Kafka({
      clientId: 'glee-app', 
      brokers: [brokerUrl.host],
      ssl: {
        rejectUnauthorized: kafkaOptions?.authentication?.rejectUnauthorized,
        key: kafkaOptions?.authentication?.keyFilePath,
        cert: kafkaOptions?.authentication?.cert,
      },
      sasl: {
        mechanism: (scramSha256SecurityReq? kafkaOptions?.authentication?.scramSha256?.mechanism : undefined) || 
                   (scramSha512SecurityReq? kafkaOptions?.authentication?.scramSha512?.mechanism : undefined),
        username: userAndPasswordSecurityReq? kafkaOptions?.authentication?.userPassword?.username : undefined,
        password: userAndPasswordSecurityReq? kafkaOptions?.authentication?.userPassword?.password : undefined,
      },
    })

    const consumer = this.kafka.consumer({ groupId: 'glee-group' })   
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
        key: message.headers.key,
        value: message.payload,
        timestamp: message.headers.timestamp,
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
