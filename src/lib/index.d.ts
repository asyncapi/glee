import GleeAdapter from "./adapter"

declare enum WebSocketServerType {
  Native = "native",
  SocketIO = "socket.io",
}

export type GleeConfig = {
  websocket?: {
    httpServer?: any,
    adapter?: WebSocketServerType | GleeAdapter,
  }
}
