export default async function () {
  return {
    send: [{
      server: 'mosquitto',
      channel: 'serverAnnounce',
      payload: {
        id: process.env.SERVER_ID || String(Date.now()),
      }
    }]
  }
}

export const lifecycleEvent = 'onConnect'
export const servers = ['mosquitto']
