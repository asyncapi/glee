// import customServer from './customServer.js'
import fs from 'fs'

export default async function () {
  return {
    mqtt: {
      auth: async ({ serverName }) => {
        if (serverName === 'mosquitto') {
          return {
            cert: fs.readFileSync('./mosquitto.org.crt', 'utf-8'),
          }
        }
      },
    },
    // websocket: {
    //   httpServer: customServer,
    //   adapter: 'native', // Default. Can also be 'socket.io' or a reference to a custom adapter.
    // },
    // cluster: {
    //   adapter: 'redis',
    //   name: 'gleeCluster',
    //   url: 'redis://localhost:6379'
    // }
  }
}
