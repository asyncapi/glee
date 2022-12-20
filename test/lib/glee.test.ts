import 'jest-extended'
import AsyncAPIDocument from '@asyncapi/parser/lib/models/asyncapi'
import {jest} from '@jest/globals'
import {Server} from '@asyncapi/parser'
import GleeConnection from '../../src/lib/connection.js'
import Glee from '../../src/lib/glee.js'
import GleeMessage from '../../src/lib/message.js'
import GleeAdapter from '../../src/lib/adapter.js'

const TEST_SERVER_NAME = 'test'
const ANOTHER_TEST_SERVER_NAME = 'another'
const TEST_CHANNEL = 'test/channel'
const TEST_ASYNCAPI_DOCUMENT = new AsyncAPIDocument({
  asyncapi: '2.2.0',
  servers: {
    test: {
      url: 'mqtt://fake-url',
      protocol: 'mqtt',
    },
    another: {
      url: 'ws://fake-url-2',
      protocol: 'ws',
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
const TEST_SERVER: Server = TEST_ASYNCAPI_DOCUMENT.server(TEST_SERVER_NAME)
const ANOTHER_TEST_SERVER: Server = TEST_ASYNCAPI_DOCUMENT.server(ANOTHER_TEST_SERVER_NAME)
class TEST_ADAPTER extends GleeAdapter {}
class ANOTHER_TEST_ADAPTER extends GleeAdapter {}

const fakeConnection = new GleeConnection({
  connection: 'anything',
  channels: [TEST_CHANNEL],
  serverName: TEST_SERVER_NAME,
  server: TEST_SERVER,
  parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
})

describe('glee', () => {
  describe('options', () => {
    it('returns options passed on constructor', async () => {
      const fakeOptions = { websocket: { server: {port: 7000} } }
      const app = new Glee(fakeOptions)
      expect(app.options).toStrictEqual(fakeOptions)
    })
  })

  describe('use()', () => {
    it('registers inbound middlewares in order', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const middlewareFn = jest.fn()
      const middlewareFn2:any = jest.fn()
      const outboundMiddlewareFn = jest.fn()
      const app = new Glee()
      app.use(middlewareFn)
      app.use(middlewareFn2)
      app.useOutbound(outboundMiddlewareFn)
      await app.connect()

      app.injectMessage(msg, TEST_SERVER_NAME, fakeConnection)

      expect(outboundMiddlewareFn).not.toHaveBeenCalledOnce()
      expect(middlewareFn).toHaveBeenCalledBefore(middlewareFn2)
    })
    
    it('registers inbound error middlewares in order', async () => {
      const middlewareFn = jest.fn()
      const errorMiddlewareFn = jest.fn(async (err, message, next) => next)
      const errorMiddlewareFn2:any = jest.fn(async (err, message, next) => next)
      const outboundMiddlewareFn = jest.fn(async (err, message, next) => next)
      const app = new Glee()
      app.use(middlewareFn)
      app.use(errorMiddlewareFn)
      app.use(errorMiddlewareFn2)
      app.useOutbound(outboundMiddlewareFn)
      await app.connect()

      app.injectError(new Error('fake-error'))

      expect(outboundMiddlewareFn).not.toHaveBeenCalled()
      expect(middlewareFn).not.toHaveBeenCalled()
      expect(errorMiddlewareFn).toHaveBeenCalledBefore(errorMiddlewareFn2)
    })
  })

  describe('useOutbound()', () => {
    it('registers outbound middlewares in order', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const middlewareFn = jest.fn()
      const middlewareFn2:any = jest.fn()
      const inboundMiddlewareFn = jest.fn()
      const app = new Glee()
      app.use(inboundMiddlewareFn)
      app.useOutbound(middlewareFn)
      app.useOutbound(middlewareFn2)
      await app.connect()

      app.send(msg)

      expect(inboundMiddlewareFn).not.toHaveBeenCalledWith(msg)
      expect(middlewareFn).toHaveBeenCalledBefore(middlewareFn2)
    })

    it('registers outbound error middlewares in order', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const middlewareFn = jest.fn((message, next:any) => next(new Error('fake-error')))
      const errorMiddlewareFn = jest.fn(async (err, message, next:any) => next(err))
      const errorMiddlewareFn2: any = jest.fn(async (err, message, next:any) => next(err))
      const inboundMiddlewareFn = jest.fn(async (err, message, next:any) => next(err))
      const app = new Glee()
      app.useOutbound(middlewareFn)
      app.useOutbound(errorMiddlewareFn)
      app.useOutbound(errorMiddlewareFn2)
      app.use(inboundMiddlewareFn)
      await app.connect()

      app.send(msg)

      expect(inboundMiddlewareFn).not.toHaveBeenCalled()
      expect(middlewareFn).toHaveBeenCalled()
      expect(errorMiddlewareFn).toHaveBeenCalledBefore(errorMiddlewareFn2)
    })
  })
  
  describe('connect()', () => {
    it('tells all adapters to connect', async () => {
      TEST_ADAPTER.prototype.connect = jest.fn()
      const app = new Glee()
      app.addAdapter(TEST_ADAPTER, {
        serverName: TEST_SERVER_NAME,
        server: TEST_SERVER,
        parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
      })
      await app.connect()
      expect(TEST_ADAPTER.prototype.connect).toHaveBeenCalledOnce()
    })
  })
  
  describe('send()', () => {
    it('sends a message to the appropriate server', async () => {
      const msg = new GleeMessage({
        payload: 'test',
        channel: TEST_CHANNEL,
        serverName: TEST_SERVER_NAME,
      })
      TEST_ADAPTER.prototype.connect = jest.fn(async () => {})
      TEST_ADAPTER.prototype.send = jest.fn(async () => {})
      ANOTHER_TEST_ADAPTER.prototype.connect = jest.fn(async () => {})
      ANOTHER_TEST_ADAPTER.prototype.send = jest.fn(async () => {})
      const app = new Glee()
      app.addAdapter(TEST_ADAPTER, {
        serverName: TEST_SERVER_NAME,
        server: TEST_SERVER,
        parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
      })
      app.addAdapter(ANOTHER_TEST_ADAPTER, {
        serverName: ANOTHER_TEST_SERVER_NAME,
        server: ANOTHER_TEST_SERVER,
        parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
      })
      await app.connect()
      app.send(msg)
      expect(TEST_ADAPTER.prototype.connect).toHaveBeenCalledOnce()
      expect(TEST_ADAPTER.prototype.send).toHaveBeenCalledWith(msg)
      expect(ANOTHER_TEST_ADAPTER.prototype.connect).toHaveBeenCalledOnce()
      expect(ANOTHER_TEST_ADAPTER.prototype.send).not.toHaveBeenCalledOnce()
    })
  })
})