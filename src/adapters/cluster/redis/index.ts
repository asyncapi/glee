import { createClient } from 'redis'
import ClusterAdapter from '../../../lib/cluster.js'
import GleeMessage from '../../../lib/message.js'

const client = createClient()
type RedisClientType = typeof client

class RedisClusterAdapter extends ClusterAdapter {
  private _channelName: string
  private _publisher: RedisClientType

  name(): string {
    return 'Redis Cluster adapter'
  }

  async connect(): Promise<this> {
    try{
      return this._connect()
    } catch (error) { 
      console.error('Error connecting to Redis:', error)
      throw error
    }
  }

  async send(message: GleeMessage): Promise<void> {
    try{
    return this._send(message)
    } catch (error) {
      console.error('Error sending message to Redis:', error)
      throw error
    }
  }

  async _connect(): Promise<this> {
    try {
    this._channelName = `${this.serverName}-channel`

    this._publisher = createClient({
      url: this.serverUrlExpanded,
    })
    const subscriber = this._publisher.duplicate()

    this._publisher.on('error', (err) => {
      this.emit('error', err)
    })

    this._publisher.on('reconnecting', () => {
      this.emit('reconnect', { name: this.name(), adapter: this })
    })

    this._publisher.on('end', () => {
      this.emit('close', { name: this.name(), adapter: this })
    })

    subscriber.on('error', (err) => {
      this.emit('error', err)
    })

    subscriber.on('reconnecting', () => {
      this.emit('reconnect', { name: this.name(), adapter: this })
    })

    subscriber.on('end', () => {
      this.emit('close', { name: this.name(), adapter: this })
    })

    await Promise.all([this._publisher.connect(), subscriber.connect()])

    subscriber.subscribe(this._channelName, (serialized) => {
      const message = this.deserializeMessage(serialized)
      if (message) this.emit('message', message)
    })

    this.emit('connect', { name: this.name(), adapter: this })
    return this
    } catch (error) {
      console.error('Error connecting to Redis:', error)
      throw error
    }
  }

  async _send(message: GleeMessage): Promise<void> {
    const serialized = this.serializeMessage(message)
    this._publisher.publish(this._channelName, serialized)
  }
}

export default RedisClusterAdapter
