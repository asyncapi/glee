import GleeQuoreMessage from "./message.js"

/**
 * Duplicates a GleeQuoreMessage.
 *
 * @private
 * @param {GleeQuoreMessage} message The message to duplicate.
 * @return {GleeQuoreMessage}
 */
export const duplicateMessage = (message: GleeQuoreMessage): GleeQuoreMessage => {
  const newMessage = new GleeQuoreMessage({
    operation: message.operation,
    payload: message.payload,
    headers: message.headers,
    channel: message.channel,
    request: message.request,
    serverName: message.serverName,
    connection: message.connection,
    broadcast: message.broadcast,
    cluster: message.cluster,
    query: message.query,
  })

  if (message.isInbound()) {
    newMessage.setInbound()
  } else {
    newMessage.setOutbound()
  }

  return newMessage
}
