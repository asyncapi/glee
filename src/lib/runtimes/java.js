import { v4 } from 'uuid'
import ipc, { sendMessage } from "../ipc.js"

const IPC_REQUEST_TIMEOUT = 60000 // 1 minute

export function runJava(operationId, messageId, message) {
  return new Promise((resolve, reject) => {
    const correlationId = v4()

    sendMessage('java', operationId, correlationId, {
      headers: message.headers,
      payload: message.payload,
      channel: message.channel,
      server: message.server,
      messageId,
    })
    .then(() => {
      const timeout = setTimeout(() => {
        reject(new Error(`Could not send IPC message "${operationId}" to Java socket.`))
      }, IPC_REQUEST_TIMEOUT)
      
      ipc.once(correlationId, (res) => {
        clearTimeout(timeout)
        resolve(res)
      })
    })
    .catch((err) => {
      console.error(err)
    })
  })
}