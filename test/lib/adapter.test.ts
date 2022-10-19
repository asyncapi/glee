import 'jest-extended'
import AsyncAPIDocument from '@asyncapi/parser/lib/models/asyncapi'
import {Server} from '@asyncapi/parser'
import GleeConnection from '../../src/lib/connection.js'
import Glee from '../../src/lib/glee.js'
import GleeMessage from '../../src/lib/message.js'
import GleeAdapter from '../../src/lib/adapter.js'
import { MiddlewareCallback } from '../../src/middlewares/index.d'
import {jest} from '@jest/globals'

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
      url: 'ws://fake-url-with-vars:{port}',
      protocol: 'ws',
      variables: {
        port: {
          default: '7000'
        }
      }
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
const RAW_CONN = { fake: 'conn' }
class TEST_ADAPTER extends GleeAdapter {
  async connect() {
    this.emit('connect', { name: 'TEST_ADAPTER', adapter: this, connection: RAW_CONN, channels: [] })
  }
}
class ANOTHER_TEST_ADAPTER extends GleeAdapter {}

const fakeConnection = new GleeConnection({
  connection: 'fake-connection',
  channels: [TEST_CHANNEL],
  serverName: TEST_SERVER_NAME,
  server: TEST_SERVER,
  parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
})

describe('adapter', () => {
  describe('glee', () => {
    it('returns the glee app passed on constructor', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.glee).toStrictEqual(app)
    })
  })
  
  describe('serverName', () => {
    it('returns the server name passed on constructor', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.serverName).toStrictEqual(TEST_SERVER_NAME)
    })
  })
  
  describe('AsyncAPIServer', () => {
    it('returns the AsyncAPI server object passed on constructor', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.AsyncAPIServer).toStrictEqual(TEST_SERVER)
    })
  })
  
  describe('parsedAsyncAPI', () => {
    it('returns the AsyncAPI document object passed on constructor', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.parsedAsyncAPI).toStrictEqual(TEST_ASYNCAPI_DOCUMENT)
    })
  })
  
  describe('channelNames', () => {
    it('returns the list of associated channel names', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.channelNames).toStrictEqual(TEST_ASYNCAPI_DOCUMENT.channelNames())
    })
  })
  
  describe('connections', () => {
    it('returns an empty array when the adapter is just initialized', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.connections).toStrictEqual([])
    })
    
    it('returns a array with the associated connections', async () => {
      const app = new Glee()
      app.addAdapter(TEST_ADAPTER, {
        serverName: TEST_SERVER_NAME,
        server: TEST_SERVER,
        parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
      })
      await app.connect()
      
      expect(app.adapters.length).toStrictEqual(1)
      expect(app.adapters[0].instance).toBeTruthy()
      expect(app.adapters[0].instance.connections.length).toStrictEqual(1)
      expect(app.adapters[0].instance.connections[0].rawConnection).toStrictEqual(RAW_CONN)
    })
  })

  describe('serverUrlExpanded', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = {
        ...OLD_ENV,
        GLEE_SERVER_VARIABLES: 'another:port:8000'
      }
    })

    afterAll(() => {
      process.env = OLD_ENV // Restore old environment
    })
    
    it('returns the server URL with variables expanded', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, ANOTHER_TEST_SERVER_NAME, ANOTHER_TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.serverUrlExpanded).toStrictEqual('ws://fake-url-with-vars:8000')
    })
  })
  
  describe('on("message")', () => {
    it('injects the message on the Glee app', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const app = new Glee()
      app.addAdapter(TEST_ADAPTER, {
        serverName: TEST_SERVER_NAME,
        server: TEST_SERVER,
        parsedAsyncAPI: TEST_ASYNCAPI_DOCUMENT,
      })
      app.use((msg: GleeMessage) => {
        expect(msg.payload).toStrictEqual('test')
      })

      await app.connect()

      expect(app.adapters.length).toStrictEqual(1)
      expect(app.adapters[0].instance).toBeTruthy()
      app.adapters[0].instance.emit('message', msg, RAW_CONN)  
    })
  })
  
  describe('on("server:ready")', () => {
    it('notifies the Glee app', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      app.on('adapter:server:ready', (ev) => {
        expect(ev).toStrictEqual({
          fake: 'object',
          serverName: TEST_SERVER_NAME,
          server: TEST_SERVER,
        })
      })
      adapter.emit('server:ready', { fake: 'object' })
    })
  })
  
  describe('on("server:connection:open")', () => {
    it('notifies the Glee app', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      app.on('adapter:server:connection:open', (ev) => {
        expect(ev.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.server).toStrictEqual(TEST_SERVER)
        expect(ev.connection).toBeInstanceOf(GleeConnection)
        expect(ev.connection.AsyncAPIServer).toStrictEqual(TEST_SERVER)
        expect(ev.connection.rawConnection).toStrictEqual(RAW_CONN)
        expect(ev.connection.channels).toStrictEqual(['fake/channel'])
        expect(ev.connection.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.connection.parsedAsyncAPI).toStrictEqual(TEST_ASYNCAPI_DOCUMENT)
      })
      adapter.emit('server:connection:open', { channels: ['fake/channel'], connection: RAW_CONN })
    })
  })
  
  describe('on("close")', () => {
    it('notifies the Glee app', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      app.on('adapter:close', (ev) => {
        expect(ev.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.server).toStrictEqual(TEST_SERVER)
        expect(ev.connection).toBeInstanceOf(GleeConnection)
        expect(ev.connection.AsyncAPIServer).toStrictEqual(TEST_SERVER)
        expect(ev.connection.rawConnection).toStrictEqual(RAW_CONN)
        expect(ev.connection.channels).toStrictEqual(['fake/channel'])
        expect(ev.connection.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.connection.parsedAsyncAPI).toStrictEqual(TEST_ASYNCAPI_DOCUMENT)
      })
      adapter.emit('close', { channels: ['fake/channel'], connection: RAW_CONN })
    })
  })
  
  describe('on("reconnect")', () => {
    it('notifies the Glee app', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      app.on('adapter:reconnect', (ev) => {
        expect(ev.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.server).toStrictEqual(TEST_SERVER)
        expect(ev.connection).toBeInstanceOf(GleeConnection)
        expect(ev.connection.AsyncAPIServer).toStrictEqual(TEST_SERVER)
        expect(ev.connection.rawConnection).toStrictEqual(RAW_CONN)
        expect(ev.connection.channels).toStrictEqual(['fake/channel'])
        expect(ev.connection.serverName).toStrictEqual(TEST_SERVER_NAME)
        expect(ev.connection.parsedAsyncAPI).toStrictEqual(TEST_ASYNCAPI_DOCUMENT)
      })
      adapter.emit('reconnect', { channels: ['fake/channel'], connection: RAW_CONN })
    })
  })
  
  describe('getSubscribedChannels()', () => {
    it('returns the list of channels to which the adapter is subscribed', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      expect(adapter.getSubscribedChannels()).toStrictEqual(['test/channel'])
    })
  })
  
  describe('connect()', () => {
    it('throws', async () => {
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      await expect(adapter.connect()).rejects.toThrowError(new Error('Method `connect` is not implemented.'))
    })
  })
  
  describe('send()', () => {
    it('throws', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const app = new Glee()
      const adapter = new GleeAdapter(app, TEST_SERVER_NAME, TEST_SERVER, TEST_ASYNCAPI_DOCUMENT)
      await expect(adapter.send(msg)).rejects.toThrowError(new Error('Method `send` is not implemented.'))
    })
  })
})