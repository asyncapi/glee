import Glee from '../glee.js'
import { runJS } from './js.js'
import { runJava } from './java.js'
import { functions } from '../functions.js'


export async function triggerFunction({
  app,
  operationId,
  messageId,
  message
}) {
  const funcDef = functions[operationId]

  let res
  
  if (funcDef.runtime === 'js') {
    res = await runJS(operationId, messageId, message)
  } else if (funcDef.runtime === 'java') {
    res = await runJava(operationId, messageId, message)
  } else {
    throw new Error(`Couldn't find a suitable runtime for "${funcDef.runtime}" files.`)
  }

  if (!res) return

  if (Array.isArray(res.send)) {
    res.send.forEach((msg) => {
      app.send(new Glee.Message({
        payload: msg.payload,
        headers: msg.headers,
        channel: msg.channel || message.channel,
        serverName: msg.server,
      }))
    })
  }

  if (res && Array.isArray(res.reply)) {
    res.reply.forEach((msg) => {
      message.reply({
        payload: msg.payload,
        headers: msg.headers,
        channel: msg.channel,
      })
    })
  }

  if (res && Array.isArray(res.broadcast)) {
    res.broadcast.forEach((msg) => {
      app.send(new Glee.Message({
        payload: msg.payload,
        headers: msg.headers,
        channel: msg.channel || message.channel,
        serverName: msg.server,
        broadcast: true,
      }))
    })
  }
}