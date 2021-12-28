import GleeMessage from "../lib/message"

export default (message: GleeMessage, next: Function) => {
  if (message.payload instanceof Buffer) {
    message.payload = message.payload.toString()
  }

  next()
}