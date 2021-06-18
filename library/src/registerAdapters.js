const MqttAdapter = require('./adapters/mqtt')
const WebSocketAdapter = require('./adapters/ws')
const SocketIOAdapter = require('./adapters/socket.io')

module.exports = (app, parsedAsyncAPI, config) => {
  if (!process.env.GLEE_SERVER_NAMES) {
    // TODO: Improve the error pointing to a guide on how to do it properly.
    throw new Error(`Missing "GLEE_SERVER_NAMES" configuration key.`)
  }

  const serverNames = process.env.GLEE_SERVER_NAMES.split(',')

  serverNames.forEach(serverName => {
    const server = parsedAsyncAPI.server(serverName)

    if (!server) {
      throw new Error(`Server "${serverName}" is not defined in the AsyncAPI file.`)
    }

    registerAdapterForServer(serverName, server, app, parsedAsyncAPI, config)
  })
}

function registerAdapterForServer(serverName, server, app, parsedAsyncAPI, config) {
  const protocol = server.protocol()
  if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
    app.addAdapter(MqttAdapter, {
      serverName,
      server,
      parsedAsyncAPI,
    })
  } else if (['amqp', 'amqps'].includes(protocol)) {
    // TODO: Implement AMQP support
  } else if (['ws', 'wss'].includes(protocol)) {
    if (!config.websocket.adapter || config.websocket.adapter === 'native') {
      app.addAdapter(WebSocketAdapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    } else if (config.websocket.adapter === 'socket.io') {
      app.addAdapter(SocketIOAdapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    } else if (typeof config.websocket.adapter === 'object') {
      app.addAdapter(config.websocket.adapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    } else {
      throw new Error(`Unknown value for websocket.adapter found in glee.config.js: ${config.websocket.adapter}. Allowed values are 'native-websocket', 'socket.io', or a reference to a custom Glee adapter.`)
    }
  } else {
    // TODO: Improve error message with link to repo encouraging the developer to contribute.
    throw new Error(`Protocol "${server.protocol()}" is not supported yet.`)
  }
}