export default async function (event) {
  return {
    send: [{
      server: event.serverName,
      channel: ["produce", "test"],
      payload: event.payload,
      headers: event.headers,
    }]
  }
}