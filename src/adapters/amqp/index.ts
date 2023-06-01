import amqplib from "amqplib"
import Adapter from "../../lib/adapter.js"
import { AMQPAdapterConfig, AMQPAuthConfig } from "../../lib/index.js"
import GleeMessage from "../../lib/message.js"

interface ClientData {
  auth?: AMQPAuthConfig
  url?: URL
  serverBindings?: any
  protocolVersion?: number
}


// const bindingTemplate: any = {
//   vhost: "/",
//   exchange: "testExchange",
//   queue: "testQueue",
//   queueOptions: {},
//   exchangeOptions: {},
//   heartbeat: 0,
// }



class AMQPAdapter extends Adapter {
  private client: amqplib

  name(): string {
    return "AMQP adapter"
  }
  async connect(): Promise<any> {
    return this._connect()
  }

  async send(message: GleeMessage){
    return this._send(message)
  }

  private async initializeConnection(data: ClientData) {
    const { url, auth, serverBindings, protocolVersion } = data

    return amqplib.connect({
      host: url.hostname,
      port: url.port || 5672,
      protocol: url.protocol.slice(0, url.protocol.length - 1),
      username: auth.username,
      password: auth.password,
      keepalive: serverBindings?.keepAlive || 0,
      vhost: serverBindings?.vhost || '/',
      heartbeat: serverBindings?.heartbeat || 0,
      protocolVersion,
    } as any)
  }

  _fnConsumer(msg, callback) {
    const newMsg = this._createMessage(msg)
    callback(true)
    this.emit("message", newMsg, this.client.connection)
  }

  _createMessage(msg) {
    const headers = {
      ...msg.fields,
      ...msg.properties,
    }
    return new GleeMessage({
      channel: msg.topic,
      headers,
      payload: msg.content.toString(),
    })
  }

  _subscribe() {
    const topics = Object.keys(this.parsedAsyncAPI.channels())
    return Promise.all(
      topics.map((topic) => {
        const operation: any = this.parsedAsyncAPI.channel(topic).publish()
        const binding = operation ? operation.binding('amqp') : undefined
        this.client
          .createChannel()
          .then((ch) => {
            let connect = ch.assertExchange(
              // eslint-disable-next-line sonarjs/no-duplicate-string
              binding?.exchange.name || "amqp.topic",
              binding?.exchange.type || "topic",
              binding?.exchange || {}
            )
            connect = connect.then(() => {
              return ch.assertQueue(
                binding?.queue.name || '',
                binding?.queue|| {}
              )
            })
              .catch((error) => this.emit("error", error))
            
            connect
              .then((conQueue) => {
                const queue = conQueue.queue
                const channel = ch
                  .bindQueue(queue, binding?.exchange.name || 'amqp.topic', topic)
                  .then(() => {
                    return queue
                  })
                  .catch((error) => console.log(error))
                channel.then((queue) => {
                  ch.consume(queue, processMsg)
                })
                const processMsg = (msg) => {
                  msg.topic = topic
                  // Process incoming messages and send them to fnConsumer
                  // Here we need to send a callback(true) for acknowledge the message or callback(false) for reject them
                  this._fnConsumer(msg, function (ok) {
                    try {
                      ok ? ch.ack(msg) : ch.reject(msg, true)
                    } catch (e) {
                      this.closeOnErr(e)
                    }
                  })
                }
              })
              .catch((error) => this.emit("error", error))
          })
      })
    )
  }

  _send(message: GleeMessage): Promise<void> {
    return new Promise((resolve, reject) => {
      const operation = this.parsedAsyncAPI
        .channel(message.channel)
        .subscribe()
      const binding = operation ? operation.binding('amqp') : undefined
      const newMessage = Buffer.from(message.payload, "utf-8")
      this.client.createChannel().then((ch) => {
        const ok = ch.assertExchange(binding ? binding.exchange.name : 'amqp.topic' , binding ? binding.exchange.type : 'topic'  , binding ? binding.exchange : {})
        return ok.then(() => {
        ch.publish(binding.exchange.name, message.channel, newMessage, {}, (err) => {
          if (err) {
            reject(err)
            this.emit("error", err)
            this.client.connection.close()
          }
          resolve()
          return ch.close()
        })
        })
      }).finally(() => this.client.connection.close())
    })
  }
  

  async _connect(): Promise<this> {
    const resolved = false
    const amqpOptions: AMQPAdapterConfig = await this.resolveProtocolConfig(
      "amqp"
    )
    const auth: AMQPAuthConfig = await this.getAuthConfig(amqpOptions.auth)
    const url = new URL(this.AsyncAPIServer.url())

    const protocolVersion = parseInt(
      this.AsyncAPIServer.protocolVersion() || "0.9.1"
    )
    const serverBindings = this.AsyncAPIServer.binding('amqp')


    this.client = await this.initializeConnection({
      url,
      auth,
      serverBindings,
      protocolVersion,
    })

    const connectClient = (): Promise<this> => {
      return new Promise((resolve, reject) => {
        const catchError = (error) => {
          if (!resolved) return reject(error)
          this.emit("error", error)
        }
        if (resolve) {
          this.emit("connect", {
            name: this.name(),
            adapter: this,
            connection: this.client.connection,
            channels: this.getSubscribedChannels(),
          })
        }
          this._subscribe()
          .catch(catchError)
      })
    }

    return connectClient()
  }
}

export default AMQPAdapter
