import EventEmitter from 'events'
import GleeConnection from './connection'

interface IGleeMessageConstructor {
  payload?: any,
  headers?: Map<string, string>,
  channel?: string,
  serverName?: string,
  connection?: GleeConnection,
  broadcast?: boolean,
}

interface IReply {
  payload?: any,
  headers?: Map<string, string>,
  channel?: string,
}

class GleeMessage extends EventEmitter {
  private _payload: any
  private _headers: Map<string, string>
  private _channel: string
  private _serverName: string
  private _connection: GleeConnection
  private _broadcast: boolean
  private _inbound: boolean
  private _outbound: boolean
  private _params: Map<string, any>

  /**
   * Instantiates a new GleeMessage.
   *
   * @param {Object} options
   * @param {Any} [options.payload] Message payload.
   * @param {Object} [options.headers] Message headers.
   * @param {String} [options.channel] Message channel.
   * @param {String} [options.serverName] The name of the associated AsyncAPI server.
   * @param {GleeConnection} [options.connection] The connection through which the message will be sent or has been received.
   * @param {Boolean} [options.broadcast=false] Whether the message should be broadcasted or not.
   */
  constructor ({
    payload,
    headers,
    channel,
    serverName,
    connection,
    broadcast = false,
  }: IGleeMessageConstructor) {
    super()

    if (payload) this._payload = payload
    if (headers) this._headers = headers
    if (channel) this._channel = channel
    if (serverName) this._serverName = serverName
    if (connection) this._connection = connection
    if (broadcast) this._broadcast = !!broadcast
  }

  get payload(): any {
    return this._payload
  }

  set payload(value: any) {
    this._payload = value
  }

  get headers(): Map<string, string> {
    return this._headers
  }

  set headers(value: Map<string, string>) {
    this._headers = value
  }

  get channel(): string {
    return this._channel
  }

  set channel(value: string) {
    this._channel = value
  }

  get serverName(): string {
    return this._serverName
  }
  
  set serverName(value: string) {
    this._serverName = value
  }

  get connection(): GleeConnection {
    return this._connection
  }
  
  set connection(value: GleeConnection) {
    this._connection = value
  }

  get broadcast(): boolean {
    return this._broadcast
  }

  get params(): Map<string, string> {
    return this._params
  }

  set params(value: Map<string, string>) {
    this._params = value
  }

  /**
   * Sends the message back to the server/broker.
   *
   * @param {Object} options
   * @param {Any} [options.payload] The new message payload. Pass falsy value if you don't want to change it.
   * @param {Object|null} [options.headers] The new message headers. Pass null if you want to remove them.
   * @param {String} [options.channel] The channel where the reply should go to.
   */
  reply ({ payload, headers, channel } : IReply) {
    if (payload) this._payload = payload

    if (headers !== undefined) {
      if (headers === null) {
        this._headers = undefined
      } else {
        this._headers = headers
      }
    }

    if (channel !== undefined) {
      if (typeof channel === 'string') {
        this._channel = channel
      } else {
        return console.error('GleeMessage.reply(): when specified, "channel" must be a string.')
      }
    }

    this.send()
  }

  /**
   * Makes the message suitable only for the inbound pipeline.
   */
  setInbound() {
    this._inbound = true
    this._outbound = false
  }
  
  /**
   * Makes the message suitable only for the outbound pipeline.
   */
  setOutbound() {
    this._inbound = false
    this._outbound = true
  }
  
  /**
   * Checks if it's an inbound message.
   */
  isInbound() {
    return this._inbound && !this._outbound
  }
  
  /**
   * Checks if it's an outbound message.
   */
  isOutbound() {
    return this._outbound && !this._inbound
  }

  /**
   * Tells Glee to send the message.
   */
  send() {
    this.emit('send', this)
  }
}

export default GleeMessage
