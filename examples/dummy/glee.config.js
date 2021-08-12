// import customServer from './customServer.js'

export default async function () {
  return {
    retry: {
      retries: 2,
    },
  //   websocket: {
  //     httpServer: customServer,
  //     adapter: 'socket.io', // Default. Can also be 'socket.io' or a reference to a custom adapter.
  //   }
  }
}