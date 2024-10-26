export default async function (event) {
  return {
    send: [{
      server: event.serverName,
      channel: 'produce',
      payload: event.payload,
      headers: event.headers,
    }]
  }
}
