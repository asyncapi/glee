
import ws from 'ws'

export default async function (event) {
  console.log("trending Anime",event)
  const url = 'ws://localhost:9000/test'
  const client = new ws(url)
  let connectionClosed = false
  client.on("open", () => {
    console.log("--connection open")
    client.send(JSON.stringify(event.payload))
    if (!connectionClosed) { // only call close() if the connection has not been closed yet
      //TODO:  How to send message back to client
      connectionClosed = true
      console.log("--connection is closed--")
      client.close() // close the WebSocket connection
    }
  })


}
