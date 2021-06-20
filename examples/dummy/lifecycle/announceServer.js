export default async function (context) {
  if (context.serverName !== 'mosquitto') return
  
  return {
    send: [{
      server: 'mosquitto',
      channel: 'server/announce',
      payload: {
        id: process.env.SERVER_ID || String(Date.now()),
      }
    }]
  }
}

export const lifecycleEvent = 'start:after'