import GleeMessage from '../lib/message'

export default (message: GleeMessage, next: Function) => {
  try {
    message.payload = JSON.stringify(message.payload)
  } catch (e) {
    // We did our best...
  }

  next()
}
