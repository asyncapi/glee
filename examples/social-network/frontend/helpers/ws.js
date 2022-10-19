export default class WS {
  static ws
  static listeners = {}

  static init() {
    this.ws = new WebSocket('ws://localhost:3001/')

    this.ws.addEventListener('open', () => {
      console.log('WS client connected to server!')
    })

    this.ws.addEventListener('message', (event) => {
      try {
        const json = JSON.parse(event.data)
        console.log(json)
        if (this.listeners[json.type]) {
          this.listeners[json.type].forEach(listener => listener(json.data))
        }
      } catch (e) {
        console.error('Unable to decode the WebSocket message:')
        console.error(e)
      }
    })
  }

  static listen(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
  }

  static send(eventName, payload) {
    this.ws.send(JSON.stringify({ type: eventName, data: payload }))
  }
}
