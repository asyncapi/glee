import { ServerInterface as AsyncAPIServer, AsyncAPIDocumentInterface as AsyncAPIDocument } from '@asyncapi/parser'

interface IGleeConnectionConstructor {
  connection: any
  channels: string[]
  serverName: string
  server: AsyncAPIServer
  parsedAsyncAPI: AsyncAPIDocument
}

class GleeConnection {
  private _rawConnection: any
  private _channels: string[]
  private _serverName: string
  private _AsyncAPIServer: AsyncAPIServer
  private _parsedAsyncAPI: AsyncAPIDocument

  /**
   * Instantiates a Glee connection.
   *
   * @param {Object} options
   * @param {any} options.connection The raw connection object this GleeConnection has to represent.
   * @param {String[]} options.channels The name of the channels associated to this connection.
   * @param {String} options.serverName  The name of the AsyncAPI server the connection is pointing to.
   * @param {AsyncAPIServer} options.server  The AsyncAPI server the connection is pointing to.
   * @param {AsyncAPIDocument} options.parsedAsyncAPI The AsyncAPI document.
   */
  constructor({
    connection,
    channels,
    serverName,
    server,
    parsedAsyncAPI,
  }: IGleeConnectionConstructor) {
    this._rawConnection = connection
    this._channels = channels
    this._serverName = serverName
    this._AsyncAPIServer = server
    this._parsedAsyncAPI = parsedAsyncAPI
  }

  get rawConnection(): any {
    return this._rawConnection
  }

  get channels(): string[] {
    return this._channels
  }

  get serverName(): string {
    return this._serverName
  }

  get AsyncAPIServer(): AsyncAPIServer {
    return this._AsyncAPIServer
  }

  get parsedAsyncAPI(): AsyncAPIDocument {
    return this._parsedAsyncAPI
  }

  /**
   * Checks whether a channel is associated with this connection.
   *
   * @param {String} channelName The name of the channel.
   * @return {Boolean}
   */
  hasChannel(channelName: string): boolean {
    return this.channels.includes(channelName)
  }

  /**
   * Returns the real connection object.
   *
   * @return {Any}
   */
  getRaw(): any {
    return this.rawConnection
  }
}

export default GleeConnection
