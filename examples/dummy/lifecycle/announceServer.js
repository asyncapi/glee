export default async function ({ connection }) {  
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

export const lifecycleEvent = 'onStart'
export const servers = ['mosquitto']