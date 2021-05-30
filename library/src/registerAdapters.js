const config = require('./lib/config')
const MqttAdapter = require('./adapters/mqtt')

module.exports = (app, parsedAsyncAPI) => {
  if (!config.SERVER_NAME) {
    // TODO: Improve the error pointing to a guide on how to do it properly.
    throw new Error(`Missing "SERVER_NAME" configuration key.`)
  }
  const server = parsedAsyncAPI.server(config.SERVER_NAME)

  if (!server) {
    throw new Error(`Server "${config.SERVER_NAME}" is not defined in your AsyncAPI file.`)
  }

  const protocol = server.protocol()
  if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
    app.addAdapter(MqttAdapter, server, parsedAsyncAPI)
  } else if (['amqp', 'amqps'].includes(protocol)) {
    // TODO: Implement AMQP support
  } else if (['ws', 'wss'].includes(protocol)) {
    // TODO: Implement AMQP support
  } else {
    // TODO: Improve error message with link to repo encouraging the developer to contribute.
    throw new Error(`Protocol "${server.protocol()}" is not supported yet.`)
  }
}