import stream from 'stream'
import GleeMessage from '../message.js'
class PayloadStringifier extends stream.Transform {
  constructor() {
    super({ objectMode: true })
  }

  _transform(message: GleeMessage, encoding, callback: stream.TransformCallback) {
    if (message.payload instanceof Buffer) {
      message.payload = message.payload.toString()
    }
    callback(null, message)
  }
}

export const bufferToString = new PayloadStringifier()
