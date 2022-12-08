import EventEmitter from 'events'
import uriTemplates from 'uri-templates'
import { v4 as uuidv4 } from 'uuid'
import Glee from './glee.js'
import GleeMessage from './message.js'
import { validateData } from './util.js'
import GleeError from '../errors/glee-error.js'

export type ClusterEvent = {
  serverName: string,
  adapter: GleeClusterAdapter
}

const ClusterMessageSchema = {
  type: 'object',
  properties: {
    instanceId: { type: 'string' },
    payload: { type: 'string' },
    headers: {
      type: 'object',
      propertyNames: { type: 'string' },
      additionProperties: { type: 'string' }
    },
    channel: { type: 'string' },
    serverName: { type: 'string' },
    broadcast: { type: 'boolean' },
    cluster: { type: 'boolean' },
    outbound: { type: 'boolean' },
    inbound: { type: 'boolean' }
  },
  required: ['instanceId', 'payload', 'channel', 'serverName', 'broadcast'],
  additionalProperties: false
}

class GleeClusterAdapter extends EventEmitter {
  private _glee: Glee
  private _serverName: string
  private _serverUrlExpanded: string
  private _instanceId: string

  /**
   * Instantiates a Glee Cluster adapter.
   *
   * @param {Glee} glee  A reference to the Glee app.
   */
  constructor (glee: Glee) {
    super()

    this._instanceId = uuidv4()
    this._glee = glee
    const serverName = this._glee.options?.cluster?.name || 'cluster'
    this._serverName = serverName
    const url = this._glee.options?.cluster?.url

    if ( !url ) {
      console.log('Please provide a URL for your cluster adapter in glee.config.js')
      process.exit(1)
    }

    const uriTemplateValues = new Map()
    process.env.GLEE_SERVER_VARIABLES?.split(',').forEach(t => {
      const [localServerName, variable, value] = t.split(':')
      if (localServerName === this._serverName) uriTemplateValues.set(variable, value)
    })
    this._serverUrlExpanded = uriTemplates(url).fill(Object.fromEntries(uriTemplateValues.entries()))

    function genClusterEvent(ev): ClusterEvent {
      return {
        ...ev,
        serverName
      }
    }

    this.on('error', err => { this._glee.injectError(err) })
    this.on('message', message => {
      message.cluster = true
      this._glee.send(message)
    })

    this.on('connect', ev => {
      this._glee.emit('adapter:cluster:connect', genClusterEvent(ev))
    })

    this.on('reconnect', ev => {
      this._glee.emit('adapter:cluster:reconnect', genClusterEvent(ev))
    })
    
    this.on('close', ev => {   
      this._glee.emit('adapter:cluster:close', genClusterEvent(ev))
    })
  }

  get glee(): Glee {
    return this._glee
  }

  get serverName(): string {
    return this._serverName
  }

  get serverUrlExpanded(): string {
    return this._serverUrlExpanded
  }

  get instanceId(): string {
    return this._instanceId
  }

  /**
   * Connects to the remote server.
   */
  async connect(): Promise<any> {
    throw new Error('Method `connect` is not implemented.')
  }

  /**
   * Sends a message to the remote server.
   *
   * @param {GleeMessage} message The message to send.
   */
  async send(message: GleeMessage): Promise<any> { // eslint-disable-line @typescript-eslint/no-unused-vars
    throw new Error('Method `send` is not implemented.')
  }

  /**
   * Serialize a message into JSON.
   *
   * @param {GleeMessage} message The message to serialize.
   * @returns {String} The serialized message,
   */
  serializeMessage(message: GleeMessage): string {
    return JSON.stringify({
      instanceId: this._instanceId,
      payload: message.payload,
      headers: message.headers,
      channel: message.channel,
      serverName: message.serverName,
      broadcast: message.broadcast,
      cluster: message.cluster,
      inbound: message.isInbound(),
      outbound: message.isOutbound()
    })
  }

  /**
   * Deserializes the serialized message.
   *
   * @param {String} serialized The serialized message
   * @returns {GleeMessage} The deserialized message.
   */
  deserializeMessage(serialized: string): GleeMessage {
    let messageData
    try {
      messageData = JSON.parse(serialized)
      const { errors, humanReadableError, isValid } = validateData(messageData, ClusterMessageSchema)
      if ( !isValid ) {
        throw new GleeError({ humanReadableError, errors })
      }
    } catch ( e ) {
      this._glee.injectError(e)
      return
    }

    let payload = messageData.payload
    try {
      payload = JSON.parse(messageData.payload)
    } catch ( e ) {
      // payload isn't JSON
    }

    if ( messageData.instanceId === this._instanceId ) return

    const message = new GleeMessage({
      payload: payload,
      headers: messageData.headers,
      channel: messageData.channel,
      serverName: messageData.serverName,
      broadcast: messageData.broadcast,
      cluster: messageData.cluster,
    })

    if (messageData.inbound && !messageData.outbound) {
      message.setInbound()
    } else {
      message.setOutbound()
    }
    
    return message
  }
  
}

export default GleeClusterAdapter
