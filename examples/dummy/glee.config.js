// import customServer from './customServer.js'
import fs from 'fs'

export default async function () {
  return {
    // websocket: {
    //   httpServer: customServer,
    //   adapter: 'native', // Default. Can also be 'socket.io' or a reference to a custom adapter.
    // },
    // cluster: {
    //   adapter: 'redis',
    //   name: 'gleeCluster',
    //   url: 'redis://localhost:6379'
    // }
    mqtt: {
      authentication: {
        cert: async () => fs.readFileSync('./mosquitto.org.crt')
      }
    }
  }
}
