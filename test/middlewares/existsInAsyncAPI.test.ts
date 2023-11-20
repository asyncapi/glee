import 'jest-extended'
import { Parser } from '@asyncapi/parser'
import existsInAsyncAPI from '../../src/middlewares/existsInAsyncAPI.js'
import GleeMessage from '../../src/lib/message.js'

describe('existsInAsyncAPI', () => {
  const document = {
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
  }

  const parser = new Parser()

  it('checks if channel exists', async () => {
    return parser.parse(document).then(({ document }) => {
      const middleware = existsInAsyncAPI(document!!);
      const message = new GleeMessage({
        channel: 'testChannel'
      });
      middleware(message, err => {
        expect(err).toBeUndefined()
      })
    })
  })

  it('error if channel does not exist', async () => {
    return parser.parse(document).then(({ document }) => {
      const middleware = existsInAsyncAPI(document!!);
      const message = new GleeMessage({
        channel: 'nonExistentChannel'
      });

      middleware(message, err => {
        expect(err).toBeInstanceOf(Error)
      })
    })
  })

  it('error if no send operation for outbound message', async () => {
    return parser.parse(document).then(({ document }) => {
      const middleware = existsInAsyncAPI(document!!);
      const message = {
        channel: 'noOperationChannel',
        isInbound: () => false,
        isOutbound: () => true
      } as GleeMessage

      middleware(message, err => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toMatch(/No 'send' operation defined/);
      });
    })
  })

  it('error if no receive operation for inbound message', async () => {
    return parser.parse(document).then(({ document }) => {
      const middleware = existsInAsyncAPI(document!!);
      const message = {
        channel: 'noOperationChannel',
        isInbound: () => true,
        isOutbound: () => false
      } as GleeMessage

      middleware(message, err => {
        expect(err).toBeInstanceOf(Error);
        expect(err?.message).toMatch(/No 'receive' operation defined/);
      });
    })
  })

  it('passes if channel has required operations', async () => {
    return parser.parse(document).then(({ document }) => {
      const middleware = existsInAsyncAPI(document!!);
      const message = {
        channel: 'testChannel',
        isOutbound: () => false,
        isInbound: () => true
      } as GleeMessage

      middleware(message, err => {
        expect(err).toBeUndefined();
      })
    })
  })
})