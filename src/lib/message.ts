import EventEmitter from 'events'
import GleeConnection from './connection.js'
import { OperationInterface } from '@asyncapi/parser'

type MessageHeaders = { [key: string]: any }
type QueryParam = { [key: string]: string } | { [key: string]: string[] }

interface IGleeMessageConstructor {
  payload?: any
  headers?: MessageHeaders
  channel?: string
  operation?: OperationInterface
  request?: GleeMessage
  serverName?: string
  connection?: GleeConnection
  broadcast?: boolean
  cluster?: boolean
  query?: QueryParam
}

class GleeMessage extends EventEmitter {
  private _payload: any
  private _headers: { [key: string]: string }
  private _channel: string
  private _serverName: string
  private _connection: GleeConnection
  private _broadcast: boolean
  private _inbound: boolean
  private _request: GleeMessage
  private _operation: OperationInterface
  private _outbound: boolean
  private _cluster: boolean
  private _params: { [key: string]: string }
  private _query: QueryParam

  /**
   * Instantiates a new GleeMessage.
   *
   * @param {Object} options
   * @param {Any} [options.payload] Message payload.
   * @param {Object} [options.headers] Message headers.
   * @param {String} [options.channel] Message channel.
   * @param {String} [options.serverName] The name of the associated AsyncAPI server.
   * @param {OperationInterface} [options.operation] The operation that this message belongs to.
   * @param {GleeMessage} [options.request] If this message is a reply, the parent message that this message is created for as a reply.
   * @param {GleeConnection} [options.connection] The connection through which the message will be sent or has been received.
   * @param {Boolean} [options.broadcast=false] Whether the message should be broadcasted or not.
   * @param {Boolean} [options.cluster=false] Whether the message is from a cluster adapter or not.
   * @param {Object} [options.query] The query parameters to send or receive query when using the HTTP protocol.
   */
  constructor({
    payload,
    headers,
    channel,
    serverName,
    operation,
    connection,
    request,
    broadcast = false,
    cluster = false,
    query,
  }: IGleeMessageConstructor) {
    super()

    if (payload) this._payload = payload
    if (headers) this._headers = headers
    if (channel) this._channel = channel
    if (serverName) this._serverName = serverName
    if (connection) this._connection = connection
    if (broadcast) this._broadcast = !!broadcast
    if (cluster) this._cluster = cluster
    if (query) this._query = query
    if (request) this._request = request
    if (operation) this._operation = operation
  }

  get payload(): any {
    return this._payload
  }

  set payload(value: any) {
    this._payload = value
  }

  hasRequest(): boolean {
    return !!this._request
  }

  set request(value: GleeMessage) {
    this._request = value
  }

  get request() {
    return this._request
  }

  get operation(): OperationInterface {
    return this._operation
  }

  set operation(value: OperationInterface) {
    this._operation = value
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
    this.emit('processing:successful')
  }

  /**
   * Indicates failure in processing the message
   */
  notifyFailedProcessing() {
    this.emit('processing:failed')
  }
}

export default GleeMessage
