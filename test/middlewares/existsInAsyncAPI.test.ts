import 'jest-extended'
import {AsyncAPIDocumentV2 as AsyncAPIDocument} from '@asyncapi/parser'
import existsInAsyncAPI from '../../src/middlewares/existsInAsyncAPI.js'
import GleeMessage from '../../src/lib/message.js'

const TEST_ASYNCAPI_DOCUMENT = new AsyncAPIDocument({
  asyncapi: '2.2.0',
  info: {title: '', version: ''},
  servers: {
    test: {
      url: 'mqtt://fake-url',
      protocol: 'mqtt',
    }
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

describe('existsInAsyncAPI', () => {
  it('checks if channel exists', done => {
    const middleware = existsInAsyncAPI(TEST_ASYNCAPI_DOCUMENT);
    const message = new GleeMessage({
      channel: 'test/channel'
    });

    middleware(message, err => {
      expect(err).toBeUndefined()
      done()
    })
  })

  it('error if channel does not exist', done => {
    const middleware = existsInAsyncAPI(TEST_ASYNCAPI_DOCUMENT);
    const message = new GleeMessage({
      channel: 'test/channel2'
    });

    middleware(message, err => {
      expect(err).toBeInstanceOf(Error)
      done()
    })
  })
})