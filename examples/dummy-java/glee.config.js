// import customServer from './customServer.js'

export default async function () {
  // return {
  //   websocket: {
  //     httpServer: customServer,
  //     adapter: 'socket.io', // Default. Can also be 'socket.io' or a reference to a custom adapter.
  //   }
  // }
  return {
    functionsDir: './src/main/java/glee/functions',
    lifecycleDir: './src/main/java/glee/lifecycle',
    modelDir: './src/main/java/glee/models',
    language: 'java'
  }
}