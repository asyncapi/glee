import GleeMessage from '../lib/message.js'

export default (message: GleeMessage, next: Function) => {
  try {
    message.payload = JSON.parse(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
