const MqttAdapter = require('./adapters/mqtt')
const SocketIOAdapter = require('./adapters/socket.io')

module.exports = (app, parsedAsyncAPI) => {
  if (!process.env.GLEE_SERVER_NAME) {
    // TODO: Improve the error pointing to a guide on how to do it properly.
    throw new Error(`Missing "GLEE_SERVER_NAME" configuration key.`)
  }
  const server = parsedAsyncAPI.server(process.env.GLEE_SERVER_NAME)

  if (!server) {
    throw new Error(`Server "${process.env.GLEE_SERVER_NAME}" is not defined in your AsyncAPI file.`)
  }

  const protocol = server.protocol()
  if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
    app.addAdapter(MqttAdapter, server, parsedAsyncAPI)
  } else if (['amqp', 'amqps'].includes(protocol)) {
    // TODO: Implement AMQP support
  } else if (['ws', 'wss'].includes(protocol)) {
    app.addAdapter(SocketIOAdapter, server, parsedAsyncAPI)
  } else {
    // TODO: Improve error message with link to repo encouraging the developer to contribute.
    throw new Error(`Protocol "${server.protocol()}" is not supported yet.`)
  }
}