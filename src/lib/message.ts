import EventEmitter from 'events'
import GleeConnection from './connection.js'
import { v4 as uuidv4 } from 'uuid'

type MessageHeaders = { [key: string]: any }
type QueryParam = { [key: string]: string } | { [key: string]: string[] }

interface IGleeMessageConstructor {
  payload?: any,
  headers?: MessageHeaders,
  channel?: string,
  serverName?: string,
  connection?: GleeConnection,
  broadcast?: boolean,
  cluster?: boolean,
  query?: QueryParam
}

interface IReply {
  payload?: any,
  headers?: { [key: string]: any },
  channel?: string,
  query?: QueryParam,
}

class GleeMessage extends EventEmitter {
  private _qos: number
  private _uuid: uuidv4
  private _payload: any
  private _headers: { [key: string]: string }
  private _channel: string
  private _serverName: string
  private _connection: GleeConnection
  private _broadcast: boolean
  private _inbound: boolean
  private _outbound: boolean
  private _cluster: boolean
  private _params: { [key: string]: string }
  private _query: QueryParam
  private _callback: (...args: any[]) => void

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
   * @param {Boolean} [options.cluster=false] Whether the message is from a cluster adapter or not.
   * @param {Object} [options.query] The query parameters to send or receive query when using the HTTP protocol.
   */
  constructor ({
    payload,
    headers,
    channel,
    serverName,
    connection,
    broadcast = false,
    cluster = false,
    query
  }: IGleeMessageConstructor) {
    super()

    this._uuid = uuidv4()
    this._qos = 1
    if (payload) this._payload = payload
    if (headers) this._headers = headers
    if (channel) this._channel = channel
    if (serverName) this._serverName = serverName
    if (connection) this._connection = connection
    if (broadcast) this._broadcast = !!broadcast
    if (cluster) this._cluster = cluster
    if (query) this._query = query
  }

  get payload(): any {
    return this._payload
  }

  set payload(value: any) {
    this._payload = value
  }

  get qos(): number {
    return this._qos
  }

  set qos(value: number) {
    this._qos = value
  }

  get uuid(): uuidv4 {
    return this._uuid
  }
  set callback(callback: any) {
    this._callback = callback
  }

  get headers(): { [key: string]: string } {
    return this._headers
  }

  set headers(value: { [key: string]: string }) {
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

  get params(): { [key: string]: string } {
    return this._params
  }

  set params(value: { [key: string]: string }) {
    this._params = value
  }

  get cluster(): boolean {
    return this._cluster
  }

  set cluster(value: boolean) {
    this._cluster = value
  }

  get query(): QueryParam {
    return this._query
  }

  set query(value: QueryParam) {
    this._query = value
  }
  /**
   * Sends the message back to the server/broker.
   *
   * @param {Object} options
   * @param {Any} [options.payload] The new message payload. Pass falsy value if you don't want to change it.
   * @param {Object|null} [options.headers] The new message headers. Pass null if you want to remove them.
   * @param {String} [options.channel] The channel where the reply should go to.
   * @param {Object} [options.query] The new message query parameters. Pass a falsy value if you don't want to change them.
   */
  reply ({ payload, headers, channel, query } : IReply) {
    if (payload) this._payload = payload

    if (query) this._query = query

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

  /**
   * Indicates successfully processed the message
   */
  notifySuccessfulProcessing() {
    if(this._callback) this._callback()
    this.emit('processing:successful')
  }

  /**
   * Indicates failure in processing the message
   */
  notifyFailedProcessing(err: Error) {
    if(this._callback) this._callback(err)
    this.emit('processing:failed')
  }
}

export default GleeMessage
