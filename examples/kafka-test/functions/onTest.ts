export default async function (event) {
  return {
    send: [{
      server: event.serverName,
      channel: event.channel,
      payload: event.payload,
      headers: event.headers,
    }]
  }
}