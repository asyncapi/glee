import dummyjson from 'dummy-json'
import { Message } from '@asyncapi/glee'

export default async function ({ glee, connection }) {
  ;(function myLoop(i) {
    setTimeout(() => {
      glee.send(new Message({
        channel: '/travel/status',
        connection,
        payload: generateResponse()
      }))
      if (--i) myLoop(i)
    }, 1000)
  }(100))

  function generateResponse() {
    const template = `{
      "destination": "{{city}}",
      "arrival": "{{int 2 6}}h",
      "distance": "{{int 18 65}}km"
    }`
    return JSON.parse(dummyjson.parse(template))
  }
}

export const lifecycleEvent = 'onNewConnection'
export const channels = ['/travel/status']