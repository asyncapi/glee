import { AsyncAPIDocument, Server } from '@asyncapi/parser'
import MqttAdapter from './adapters/mqtt/index.js'
import WebSocketServerAdapter from './adapters/ws/server.js'
import WebsocketClientAdapter from './adapters/ws/client.js'
import SocketIOAdapter from './adapters/socket.io/index.js'
import RedisClusterAdapter from './adapters/cluster/redis/index.js'
import { getSelectedServerNames } from './lib/servers.js'
import Glee from './lib/glee.js'
import { GleeConfig, GleeClusterAdapterConfig } from './lib/index.js'
import HttpServerAdapter from './adapters/http/server.js'
import HttpClientAdapter from './adapters/http/client.js'
import KafkaAdapter from './adapters/kafka/index.js'

export default async (
  app: Glee,
  parsedAsyncAPI: AsyncAPIDocument,
  config: GleeConfig
) => {
  const serverNames = await getSelectedServerNames()

  serverNames.forEach((serverName) => {
    const server = parsedAsyncAPI.server(serverName)

    if (!server) {
      throw new Error(
        `Server "${serverName}" is not defined in the AsyncAPI file.`
      )
    }

    registerAdapterForServer(serverName, server, app, parsedAsyncAPI, config)
  })

  if (config.cluster) registerAdapterForCluster(app, config.cluster)
}

function registerAdapterForServer(
  serverName: string,
  server: Server,
  app: Glee,
  parsedAsyncAPI: AsyncAPIDocument,
  config: GleeConfig
) {
  const protocol = server.protocol()
  const remoteServers = parsedAsyncAPI.extension('x-remoteServers')
  if (['mqtt', 'mqtts', 'secure-mqtt'].includes(protocol)) {
    app.addAdapter(MqttAdapter, {
      serverName,
      server,
      parsedAsyncAPI,
    })
  } else if (['kafka', 'kafka-secure'].includes(protocol)) {
    app.addAdapter(KafkaAdapter, {
      serverName,
      server,
      parsedAsyncAPI,
    })
  } else if (['amqp', 'amqps'].includes(protocol)) {
    // TODO: Implement AMQP support
  } else if (['ws', 'wss'].includes(protocol)) {
    const configWsAdapter = config?.ws?.server?.adapter
    if (remoteServers && remoteServers.includes(serverName)) {
      app.addAdapter(WebsocketClientAdapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    } else {
      if (!configWsAdapter || configWsAdapter === 'native') {
        app.addAdapter(WebSocketServerAdapter, {
          serverName,
          server,
          parsedAsyncAPI,
        })
      } else if (configWsAdapter === 'socket.io') {
        app.addAdapter(SocketIOAdapter, {
          serverName,
          server,
          parsedAsyncAPI,
        })
      } else if (typeof configWsAdapter === 'object') {
        app.addAdapter(configWsAdapter, {
          serverName,
          server,
          parsedAsyncAPI,
        })
      } else {
        throw new Error(
          `Unknown value for websocket.adapter found in glee.config.js: ${config.ws.server.adapter}. Allowed values are 'native-websocket', 'socket.io', or a reference to a custom Glee adapter.`
        )
      }
    }
  } else if (['http', 'https'].includes(protocol)) {
    if (remoteServers && remoteServers.includes(serverName)) {
      app.addAdapter(HttpClientAdapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    } else {
      app.addAdapter(HttpServerAdapter, {
        serverName,
        server,
        parsedAsyncAPI,
      })
    }
  } else {
    // TODO: Improve error message with link to repo encouraging the developer to contribute.
    throw new Error(`Protocol "${server.protocol()}" is not supported yet.`)
  }
}

function registerAdapterForCluster(
  app: Glee,
  config: GleeClusterAdapterConfig
) {
  const adapter = config.adapter

  if (!adapter || adapter === 'redis') {
    app.setClusterAdapter(RedisClusterAdapter)
  } else if (typeof adapter === 'function') {
    app.setClusterAdapter(adapter)
  } else {
    throw new Error(`Unknown value for cluster.adapter in glee.config.js`)
  }
}
