import { Kafka, SASLOptions } from 'kafkajs'
import Adapter from '../../lib/adapter.js'
import GleeQuoreMessage from '../../lib/message.js'
import { KafkaAdapterConfig, KafkaAuthConfig } from '../../index.d.js'

class KafkaAdapter extends Adapter {
  private kafka: Kafka
  private firstConnect = true
  name(): string {
    return 'Kafka adapter'
  }

  async connect(): Promise<void> {
    await this._connect()
  }

  async _connect() {
      const kafkaOptions: KafkaAdapterConfig = await this.resolveProtocolConfig(
        'kafka'
      )
      const auth: KafkaAuthConfig = await this.getAuthConfig(kafkaOptions?.auth)
      const securityRequirements = this.AsyncAPIServer.security().map(
        (sec) => {
          const secName = Object.keys(sec.values())[0]
          return this.parsedAsyncAPI.components().securitySchemes().get(secName)
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
        rejectUnauthorized: auth?.rejectUnauthorized,
        key: auth?.key,
        cert: auth?.cert,
      },
      sasl: {
        mechanism:
          (scramSha256SecurityReq ? 'scram-sha-256' : undefined) ||
          (scramSha512SecurityReq ? 'scram-sha-512' : undefined) ||
          'plain',
        username: userAndPasswordSecurityReq ? auth?.username : undefined,
        password: userAndPasswordSecurityReq ? auth?.password : undefined,
      } as SASLOptions,
    })

    const consumer = this.kafka.consumer({ groupId: 'glee-group' })
    consumer.on('consumer.connect', () => {
      if (this.firstConnect) {
        this.firstConnect = false
        this.emit('connect', {
          name: this.name(),
          adapter: this,
          connection: consumer,
          channels: this.getSubscribedChannels(),
        })
      }
    })
    await consumer.connect()
    const subscribedChannels = this.getSubscribedChannels()
    await consumer.subscribe({
      topics: subscribedChannels,
      fromBeginning: true,
    })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const msg = this._createMessage(topic, partition, message)
        this.emit('message', msg, consumer)
      },
    })
  }

  async send(message: GleeQuoreMessage) {
    const producer = this.kafka.producer()
    await producer.connect()
    await producer.send({
      topic: message.channel,
      messages: [
        {
          key: message.headers.key,
          value: message.payload,
          timestamp: message.headers.timestamp,
        },
      ],
    })
    await producer.disconnect()
  }

  _createMessage(topic, partition, message) {
    return new GleeQuoreMessage({
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
