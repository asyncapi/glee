class GleeConnection {
  /**
   * Instantiates a Glee connection.
   *
   * @param {Object} options
   * @param {String[]} options.channels The name of the channels associated to this connection.
   * @param {String} options.serverName  The name of the AsyncAPI server the connection is pointing to.
   * @param {AsyncAPIServer} options.server  The AsyncAPI server the connection is pointing to.
   * @param {AsyncAPIDocument} options.parsedAsyncAPI The AsyncAPI document.
   */
  constructor ({ connection, channels, serverName, server, parsedAsyncAPI }) {
    if (!connection) throw new Error('Please provide a connection object to create the connection representation.')
    if (!Array.isArray(channels) || !channels.length) throw new Error('Please provide a list of channels to create the connection.')
    if (!serverName) throw new Error('Please provide a server name to create the connection.')
    if (!server) throw new Error('Please provide a server object to create the connection.')
    if (!parsedAsyncAPI) throw new Error('Please provide a parsed AsyncAPI document to create the connection.')

    this.rawConnection = connection
    this.channels = channels
    this.serverName = serverName
    this.AsyncAPIServer = server
    this.parsedAsyncAPI = parsedAsyncAPI
  }

  /**
   * Checks whether a channel is associated with this connection.
   *
   * @param {String} channelName The name of the channel.
   * @return {Boolean}
   */
  hasChannel (channelName) {
    return this.channels.includes(channelName)
  }
  
  /**
   * Returns the real connection object.
   *
   * @return {Any}
   */
  getRaw () {
    return this.rawConnection
  }
}

export default GleeConnection