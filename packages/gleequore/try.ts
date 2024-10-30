import GleeQuore from './dist/index.js'
import { Parser } from '@asyncapi/parser'

const parser = new Parser()
const { document: asyncapi } = await parser.parse({
  asyncapi: '3.0.0',
  info: { title: '', version: '' },
  servers: {
    test: {
      host: 'test.mosquitto.org',
      protocol: 'mqtt',
    },
  },
  channels: {
    testChannel: {
      address: 'test/channel',
      messages: {
        test: {
          payload: {
            type: 'string',
          },
        },
      },
    },
  },
  operations: {
    receiveTest: {
      action: 'receive',
      channel: {
        $ref: '#/channels/testChannel'
      },
    },
    sendTest: {
      action: 'send',
      channel: {
        $ref: '#/channels/testChannel'
      },
    },
  },
})

if (!asyncapi) {
  throw new Error('Not a valid AsyncAPI document')
}

const gleeQuore = new GleeQuore(asyncapi)

// gleeQuore.addAdapter(HttpAdapter, 'test', {
//   httpServer: {
//     port: 3000,
//   },
// })

gleeQuore.on('receiveTest', (event) => {
  console.log(event.payload)
})

// Can we come up with better event names?
// whenConnectedToServer maybe?
// gleeQuore.server('test').onConnect maybe?
// the last one makes sense if we also want to access server variables eventually
// although I don't know how this would look like or what the use cases could be...
// same might apply to channel parameters and message.correlationId pointers
gleeQuore.onConnectToServer('test', () => {
  gleeQuore.send({
    channel: 'testChannel',
    payload: 'Hola hola'
  })
})

gleeQuore.onError((err) => {
  console.error(err.message)
})

gleeQuore.start().catch(console.error)
