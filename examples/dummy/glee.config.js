// import customServer from './customServer.js'
import fs from 'fs'

export default async function () {
  return {
    docs: {
      enabled: false
    },
    mqtt: {
      auth: async ({serverName}) => {
        if(serverName === 'mosquitto') {
          return {
            cert: fs.readFileSync('./mosquitto.org.crt', 'utf-8')
          }
        }
      }
    }
  }
}
