import { Server } from 'socket.io'
import Adapter from '../../lib/adapter.js'
import GleeMessage from '../../lib/message.js'

class SocketIOAdapter extends Adapter {
  private server: Server

  name(): string {
    return 'Socket.IO adapter'
  }

  async connect(): Promise<this> {
    return this._connect()
  }

  async send(message: GleeMessage): Promise<void> {
    return this._send(message)
  }

  async _connect(): Promise<this> {
    const config = await this.resolveProtocolConfig('websocket')
    const websocketOptions = config?.server
    const serverUrl: URL = new URL(this.serverUrlExpanded)
    const asyncapiServerPort: number = serverUrl.port
      ? Number(serverUrl.port)
      : 80
    const optionsPort: number = websocketOptions?.port
    const port: number = optionsPort || asyncapiServerPort

    const serverOptions: { [key: string]: any } = {
      path: serverUrl.pathname || '/',
      serveClient: false,
      transports: ['websocket'],
    }

    if (websocketOptions.httpServer) {
      const server = websocketOptions.httpServer
      if (!optionsPort && String(server.address().port) !== String(port)) {
        console.error(
          `Your custom HTTP server is listening on port ${server.address().port
          } but your AsyncAPI file says it must listen on ${port}. Please fix the inconsistency.`
        )
        process.exit(1)
      }
      this.server = new Server(server, serverOptions)
    } else {
      this.server = new Server({
        ...serverOptions,
        ...{
          cors: {
            origin: true,
          },
        },
      })
    }

    this.server.on('connect', (socket) => {
      this.emit('server:ready', {
        name: this.name(),
        adapter: this,
        connection: socket,
        channels: this.channelNames,
      })

      socket.onAny((eventName, payload) => {
        const msg = this._createMessage(eventName, payload)
        this.emit('message', msg, socket)
      })
    })

    if (!websocketOptions.httpServer) {
      this.server.listen(port)
    }
    return this
  }

  async _send(message: GleeMessage): Promise<void> {
    if (message.broadcast) {
      this.glee.syncCluster(message)

      this.connections
        .filter(({ channels }) => channels.includes(message.channel))
        .forEach((connection) => {
          connection.getRaw().emit(message.channel, message.payload)
        })
    } else {
      if (!message.connection) {
        throw new Error(
          'There is no Socket.IO connection to send the message yet.'
        )
      }
      message.connection.getRaw().emit(message.channel, message.payload)
    }
  }

  _createMessage(eventName: string, payload: any) {
    return new GleeMessage({
      payload,
      channel: eventName,
    })
  }
}

export default SocketIOAdapter
