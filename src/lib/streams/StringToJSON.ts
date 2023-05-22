import stream from 'stream'
import GleeMessage from '../message.js'

class JSONParser extends stream.Transform {
  constructor() {
    super({ objectMode: true })
  }

  _transform(message: GleeMessage, encoding: BufferEncoding, callback: stream.TransformCallback) {
    try {
      message.payload = JSON.parse(message.payload)
      callback(null, message)
    } catch (e) {
      callback(e)
    }
  }
}

export const stringToJSON = new JSONParser()
