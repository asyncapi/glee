import 'jest-extended'
import { AsyncAPIDocumentInterface, Parser } from '@asyncapi/parser'
import existsInAsyncAPI from '../../src/middlewares/existsInAsyncAPI.js'
import GleeMessage from '../../src/lib/message.js'

describe('existsInAsyncAPI', () => {


  const parser = new Parser()
  let document: AsyncAPIDocumentInterface
  beforeAll(async () => {
    const parsedResult = await parser.parse({
      asyncapi: "3.0.0",
      info: {
        title: "",
        version: ""
      },
      servers: {
        test: {
          host: "fake-url",
          protocol: "mqtt"
        }
      },
      channels: {
        testChannel: {
          address: "test/channel"
        },
        noOperationChannel: {
          address: "no/operation"
        }
      },
      operations: {
        receiveTest: {
          action: "receive",
          channel: {
            "$ref": "#/channels/testChannel"
          }
        }
      }
    })

    if (parsedResult.document)
      document = parsedResult.document
  })

  it('checks if channel exists', done => {
    const middleware = existsInAsyncAPI(document);
    const message = new GleeMessage({
      channel: 'testChannel'
    });

    middleware(message, err => {
      expect(err).toBeUndefined()
      done()
    })
  })

  it('error if channel does not exist', done => {
    const middleware = existsInAsyncAPI(document);
    const message = new GleeMessage({
      channel: 'nonExistentChannel'
    });

    middleware(message, err => {
      expect(err).toBeInstanceOf(Error)
      done()
    })
  })

  it('error if no send operation for outbound message', done => {
    const middleware = existsInAsyncAPI(document);
    const message = {
      channel: 'noOperationChannel',
      isInbound: () => false,
      isOutbound: () => true
    } as GleeMessage

    middleware(message, err => {
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toMatch(/No 'send' operation defined/);
      done();
    });
  });

  it('error if no receive operation for inbound message', done => {
    const middleware = existsInAsyncAPI(document);
    const message = {
      channel: 'noOperationChannel',
      isInbound: () => true,
      isOutbound: () => false
    } as GleeMessage

    middleware(message, err => {
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toMatch(/No 'receive' operation defined/);
      done();
    });
  });

  it('passes if channel has required operations', done => {
    const middleware = existsInAsyncAPI(document);
    const message = {
      channel: 'testChannel',
      isOutbound: () => false,
      isInbound: () => true
    } as GleeMessage

    middleware(message, err => {
      expect(err).toBeUndefined();
      done();
    });
  });
})