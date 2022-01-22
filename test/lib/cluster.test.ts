import 'jest-extended'
import Glee from '../../src/lib/glee'
import GleeClusterAdapter from '../../src/lib/cluster'
import {validate as uuidValidate, version as uuidVersion} from 'uuid'
import GleeMessage from '../../src/lib/message'
import { MiddlewareCallback } from '../../src/middlewares'

const TEST_SERVER_NAME = 'test'
class TEST_ADAPTER extends GleeClusterAdapter {
  async connect() {
    this.emit('connect', { name: TEST_SERVER_NAME, adapter: this })
  }
}

const fakeConfig = {
    cluster: {
      adapter: TEST_ADAPTER,
      url: 'test://fake-url.com',
      name: TEST_SERVER_NAME
    }
}

const anotherFakeConfig = {
  cluster: {
    adapter: TEST_ADAPTER,
    url: 'test://fake-url-with-vars:{port}',
    name: TEST_SERVER_NAME
  }
}

describe('clusterAdapter', () => {
  describe('glee', () => {
    it('returns the glee app passed on constructor', () => {
      const app = new Glee(fakeConfig)
      const adapter = new GleeClusterAdapter(app)
      expect(adapter.glee).toStrictEqual(app)
    })
  })
  
  describe('serverName', () => {
    it('returns the server name passed on constructor', () => {
      const app = new Glee(fakeConfig)
      const adapter = new GleeClusterAdapter(app)
      expect(adapter.serverName).toStrictEqual(TEST_SERVER_NAME)
    })
  })

  describe('serverUrlExpanded', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = {
        ...OLD_ENV,
        GLEE_SERVER_VARIABLES: `${TEST_SERVER_NAME}:port:8000`
      }
    })

    afterAll(() => {
      process.env = OLD_ENV
    })
    
    it('returns the server URL with variables expanded', () => {
      const app = new Glee(anotherFakeConfig)
      const adapter = new GleeClusterAdapter(app)
      expect(adapter.serverUrlExpanded).toStrictEqual('test://fake-url-with-vars:8000')
    })
  })

  describe('instanceId', () => {
    it('returns the current instance id', () => {
      const app = new Glee(fakeConfig)
      const adapter = new GleeClusterAdapter(app)
      expect(uuidValidate(adapter.instanceId) && uuidVersion(adapter.instanceId)).toStrictEqual(4)
    })
  })

  describe('on("message")', () => {
    it('sends the message to glee', async () => {
      const app = new Glee(fakeConfig)
      app.setClusterAdapter(TEST_ADAPTER)

      const msg = new GleeMessage({
        payload: 'test'
      })

      app.useOutbound((msg: GleeMessage) => {
        expect(msg.cluster).toStrictEqual(true)
        expect(msg.payload).toStrictEqual('test')
      })

      await app.connect()
      expect(app.clusterAdapter.instance).toBeTruthy()
      app.clusterAdapter.instance.emit('message', msg)
    })
  })

  describe('connect()', () => {
    it('throws', async () => {
      const app = new Glee(fakeConfig)
      const adapter = new GleeClusterAdapter(app)
      await expect(adapter.connect()).rejects.toThrowError(new Error('Method `connect` is not implemented.'))
    })
  })

  describe('send()', () => {
    it('throws', async () => {
      const msg = new GleeMessage({
        payload: 'test'
      })
      const app = new Glee(fakeConfig)
      app.setClusterAdapter(TEST_ADAPTER)
      app.use((err: Error, message: GleeMessage, next: MiddlewareCallback) => {
        expect(err).toStrictEqual(new Error('Method `send` is not implemented.'))
      })

      await app.connect()

      app.syncCluster(msg)
    })
  })

  describe('serialize() and deserialize()', () => {
    let serialized
    const app = new Glee(fakeConfig)
    const msg = new GleeMessage({
      payload: 'test',
      channel: 'test',
      serverName: 'test-server',
      broadcast: true
    })

    it('serialize message to JSON', () => {
      const adapter = new GleeClusterAdapter(app)
      serialized = adapter.serializeMessage(msg)
      expect(typeof serialized).toStrictEqual('string')
    })

    it('deserialize JSON to message', () => {
      const adapter = new GleeClusterAdapter(app)
      const msg = adapter.deserializeMessage(serialized)
      expect(msg).toBeInstanceOf(GleeMessage)
      expect(msg.payload).toStrictEqual('test')
      expect(msg.channel).toStrictEqual('test')
      expect(msg.serverName).toStrictEqual('test-server')
      expect(msg.broadcast).toStrictEqual(true)
    })
  })
})
