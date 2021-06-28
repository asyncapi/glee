import { Readable } from 'stream'

const readableStream = new Readable({
  objectMode: true,
  read() { }
})

setInterval(() => {
  readableStream.push({ hola: true })
}, 1000)

readableStream.on('readable', () => {
  let data
  while(data = readableStream.read(1)) {
    console.log(data)
  }
})
