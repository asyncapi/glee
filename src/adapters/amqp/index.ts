import { Channel as AsyncAPIChannel } from '@asyncapi/parser'
import amqplib, { Channel as AMQPChannel, Connection, ConsumeMessage } from 'amqplib'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'


type AMQPOperation = 'queue' | 'exchange' | undefined
const AMQP_DEFAULT_VHOST = '/'
interface VirtualHost {
  asyncAPIChannels?: string[]
  connection?: Connection,
  channel?: AMQPChannel
}


class AmqpAdapter extends Adapter {
  private hosts: Map<string, VirtualHost> = new Map()

  name(): string {
    return 'AMQP adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage) {
    throw Error('Send is not implemented for AMQP.')
    //return this._send(message)
  }

  async _connect(): Promise<this> { // NOSONAR
    this.hosts = this._getVHosts()
    console.log('vhosts: ', this.hosts)
     const url = new URL(this.AsyncAPIServer.url())
    for (const [vHostName, vhost] of this.hosts) {
      
      const connection = await amqplib.connect({
        vhost: vHostName,
        // username: auth.username,
        // password: auth.password,
        protocol: url.protocol.substring(0, -1),
        hostname: url.hostname,
      })

      vhost.connection = connection
      const amqpChannel = await connection.createChannel()
      vhost.channel = amqpChannel

      if(!vhost.asyncAPIChannels) continue

      for(const channelName of vhost.asyncAPIChannels){
        this._subscribe(channelName, vHostName)
      }
      connection.on('close', () => {
        this.emit('close', {
          connection: connection,
          channels: this.channelNames,
        })
      })
  
      connection.on('error', (error) => {
        this.emit('error', error)
      })

      this.emit('connect', {
        name: `${this.name()}${vhost}`,
        adapter: this,
        connection: connection,
        channels: vhost.asyncAPIChannels,
      })
      
    }   
    

     return this

  }
  private _subscribe(channelName: string, vhostName: string) {
       const operation = this.parsedAsyncAPI.channel(channelName).publish()
       if(!operation) return
       const amqpChannel = this.hosts.get(vhostName)?.channel
       const bindings = operation.binding('amqp')
       const isQueue = bindings.is === 'queue' || true
      try{
        if(isQueue){
          const queue = bindings.queue?.name || channelName
          amqpChannel?.assertQueue(queue, {
            durable: bindings.queue?.durable || false,
            exclusive: bindings?.queue?.exclusive,
            autoDelete: bindings?.queue?.autoDelete,
          })
          console.log('listening for queue: ', queue)
          amqpChannel?.consume(queue, (msg) => this._consume(msg, channelName, vhostName))
        } else {
          const exchange = bindings.exchange.name || channelName
          amqpChannel?.assertExchange(exchange,bindings.exchange.type, {
            durable: bindings.exchange?.durable,
            autoDelete: bindings.exchange?.autoDelete,
          })
  
          amqpChannel?.consume(exchange, (msg) => this._consume(msg, channelName, vhostName))
        }
      }catch(e){
        console.log(e)
      }

  }
  private _consume(msg: ConsumeMessage | null, channelName: string, vHostName: string){
    if(!msg) return
    const message = this._createMessage(msg, channelName)
    this.emit('message', message, this.hosts.get(vHostName)?.connection)
  }
  private _getVHosts(): Map<string, VirtualHost> {
    const vhosts: Map<string, VirtualHost> = new Map()
    const setVhost = (operation, channel) => {
      const operationBindings = operation.binding('amqp')
      const operationType: AMQPOperation = operation.binding('amqp').is || 'queue'
      let vhostName: string = operationType === 'queue' ? operationBindings.queue?.vhost : operationBindings.exchange?.vhost
      if(!vhostName) vhostName = AMQP_DEFAULT_VHOST
      
      if(vhosts.has(vhostName)){
        vhosts.get(vhostName)?.asyncAPIChannels?.push(channel)
      } else {
        vhosts.set(AMQP_DEFAULT_VHOST, {
          asyncAPIChannels: [channel],
        })
      }
    }
    const allChannels = this.getAllChannels()
    for(const channelName of allChannels){
      const channel = this.parsedAsyncAPI.channel(channelName)
      if(channel.hasPublish()){
       setVhost(channel.publish(), channelName)
      }
      if(channel.hasSubscribe()){
        setVhost(channel.subscribe(), channelName)
      }
    }

   return vhosts
  }
  private getVirtualHost = (channelName: string): string => {
    const channel = this.parsedAsyncAPI.channel(channelName)
    const operationBindings = channel.publish().binding('amqp')
    const vhost = operationBindings.is === 'queue' ? operationBindings.queue?.vhost : operationBindings.exchange.vhost
    return vhost || '/'
  }

  // _send(message: GleeMessage): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const operation = this.parsedAsyncAPI
  //       .channel(message.channel)
  //       .subscribe()
  //     const binding = operation ? operation.binding('mqtt') : undefined
  //     this.client.publish(
  //       message.channel,
  //       message.payload,
  //       {
  //         qos: binding && binding.qos ? binding.qos : 2,
  //         retain: binding && binding.retain ? binding.retain : false,
  //       },
  //       (err) => {
  //         if (err) {
  //           reject(err)
  //           return
  //         }

  //         resolve()
  //       }
  //     )
  //   })
  // }

  _createMessage(packet: ConsumeMessage, asyncAPIChannel: string): GleeMessage {

    return new GleeMessage({
      payload: packet.content,
      headers: packet.properties.headers,
      channel: asyncAPIChannel,
    })
  }

}

export default AmqpAdapter
