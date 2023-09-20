import 'jest-extended'
import {AsyncAPIDocumentV2} from '@asyncapi/parser'
import GleeMessage from '../../src/lib/message.js'
import validate from '../../src/middlewares/validate.js'
import GleeError from '../../src/errors/glee-error.js'

const TEST_ASYNCAPI_DOCUMENT =  new AsyncAPIDocumentV2({
  asyncapi: '2.2.0',
  info: {
    title: '',
    version: ''
  },
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
            type: 'object',
            required: ['test'],
            properties: {
              test: {
                type: 'string'
              },
              test2: {
                type: 'integer'
              }
            }
          }
        }
      }
    }
  }
})

const schema = TEST_ASYNCAPI_DOCUMENT.channels().get('test/channel')?.json().publish.message.payload
const middleware = validate(schema)

describe('validate', () => {
  it('validates message payload', done => {
    const message = new GleeMessage({
      payload: {
        test: 'hello world',
        test2: 2
      }
    })

    middleware(message, err => {
      expect(err).toBeUndefined()
      done()
    })
  })

  it('validates message payload', done => {
    const message = new GleeMessage({
      payload: {
        test: 1
      }
    })

    middleware(message, err => {
      expect(err).toBeInstanceOf(GleeError)
      done()
    })
  })
})