import 'jest-extended'
import GleeConnection from '../../src/lib/connection.js'
import AsyncAPIDocument from '@asyncapi/parser/lib/models/asyncapi'
import GleeMessage from '../../src/lib/message.js'
import validateConnection from '../../src/middlewares/validateConnection.js'

const TEST_SERVER_NAME = 'test'
const TEST_CHANNEL = 'test/channel'
const TEST_ASYNCAPI_DOCUMENT = new AsyncAPIDocument({
  asyncapi: '2.2.0',
  servers: {
    test: {
      url: 'mqtt://fake-url',
      protocol: 'mqtt',
    },
  },
  channels: {
    'test/channel': {
      publish: {
        message: {
          payload: {
            type: 'string',
          }
        }
      }
    }
  }
})
const TEST_SERVER = TEST_ASYNCAPI_DOCUMENT.server(TEST_SERVER_NAME)

const fakeConnection = new GleeConnection({
  connection: 'fake-connection',
  channels: [TEST_CHANNEL],
  serverName: TEST_SERVER_NAME,
  server: TEST_SERVER,
  parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
})

describe('validateConnection', () => {
  it('validates channel in connection', done => {
    const message = new GleeMessage({
      connection: fakeConnection,
      channel: TEST_CHANNEL
    })

    validateConnection(message, err => {
      expect(err).toBeUndefined()
      done()
    })
  })

  it('error if channel does not exist', done => {
    const message = new GleeMessage({
      connection: fakeConnection,
      channel: 'fake-channel'
    })

    validateConnection(message, err => {
      expect(err).toBeInstanceOf(Error)
      done()
    })
  })

  it('ignored if no connection in message', done => {
    const message = new GleeMessage({
      channel: 'fake-channel'
    })

    validateConnection(message, err => {
      expect(err).toBeUndefined()
      done()
    })
  })
})