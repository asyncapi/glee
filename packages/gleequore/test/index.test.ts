import { describe, it, jest, beforeEach, expect } from '@jest/globals';
import { AsyncAPIDocumentInterface } from '@asyncapi/parser';
import GleeQuore from '../src/index';
import { EventEmitter } from 'events';
import { Parser } from '@asyncapi/parser'
import { GleeQuoreAuthFunction, GleeQuoreAuthFunctionEvent } from '../src/index.d';
import GleeQuoreConnection from '../src/lib/connection';

const asyncapiDocumentAsJS = {
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
};

// Generate tests for GleeQuore class
describe('GleeQuore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('should instantiate GleeQuore with default values', async () => {
    const parser = new Parser()
    const { document: asyncapi } = await parser.parse(asyncapiDocumentAsJS)
    const gleeQuore = new GleeQuore(asyncapi as AsyncAPIDocumentInterface);
    expect(gleeQuore.asyncapi).toBe(asyncapi);
    expect(gleeQuore.options).toStrictEqual({});
    expect(gleeQuore.adapters).toEqual([]);
    expect(gleeQuore.clusterAdapter).toBeUndefined();
    expect(gleeQuore['_lifecycleEvents']).toBeInstanceOf(Map);
    expect(gleeQuore['_functions']).toBeInstanceOf(Map);

    expect(gleeQuore['_router']['middlewares'][0].channel).toBeUndefined();
    expect(gleeQuore['_router']['middlewares'][0].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['middlewares'][0].fn.name).toBe('existsInAsyncAPI');
    expect(gleeQuore['_router']['middlewares'][1].channel).toBeUndefined();
    expect(gleeQuore['_router']['middlewares'][1].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['middlewares'][1].fn.name).toBe('buffer2string');
    expect(gleeQuore['_router']['middlewares'][2].channel).toBeUndefined();
    expect(gleeQuore['_router']['middlewares'][2].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['middlewares'][2].fn.name).toBe('string2json');
    expect(gleeQuore['_router']['middlewares'][3].channel).toBe('testChannel');
    expect(gleeQuore['_router']['middlewares'][3].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['middlewares'][3].fn.name).toBe('validate');
    expect(gleeQuore['_router']['middlewares'][4].channel).toBe('testChannel');
    expect(gleeQuore['_router']['middlewares'][4].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['middlewares'][4].fn.name).toBe('');

    expect(gleeQuore['_router']['outboundMiddlewares'][0].channel).toBeUndefined();
    expect(gleeQuore['_router']['outboundMiddlewares'][0].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['outboundMiddlewares'][0].fn.name).toBe('existsInAsyncAPI');
    expect(gleeQuore['_router']['outboundMiddlewares'][1].channel).toBeUndefined();
    expect(gleeQuore['_router']['outboundMiddlewares'][1].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['outboundMiddlewares'][1].fn.name).toBe('default');
    expect(gleeQuore['_router']['outboundMiddlewares'][2].channel).toBe('testChannel');
    expect(gleeQuore['_router']['outboundMiddlewares'][2].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['outboundMiddlewares'][2].fn.name).toBe('validate');
    expect(gleeQuore['_router']['outboundMiddlewares'][3].channel).toBe('testChannel');
    expect(gleeQuore['_router']['outboundMiddlewares'][3].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['outboundMiddlewares'][3].fn.name).toBe('default');

    expect(gleeQuore['_router']['errorMiddlewares'][0].channel).toBeUndefined();
    expect(gleeQuore['_router']['errorMiddlewares'][0].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['errorMiddlewares'][0].fn.name).toBe('');

    expect(gleeQuore['_router']['outboundErrorMiddlewares'][0].channel).toBeUndefined();
    expect(gleeQuore['_router']['outboundErrorMiddlewares'][0].fn).toBeInstanceOf(Function);
    expect(gleeQuore['_router']['outboundErrorMiddlewares'][0].fn.name).toBe('');
  });

  // it('should instantiate GleeQuore and listen to internal events', async () => {
  //   const parser = new Parser()
  //   const { document: asyncapi } = await parser.parse(asyncapiDocumentAsJS)
  //   const spyEventEmitterOn = jest.spyOn(EventEmitter.prototype, 'on').mockImplementation(function () { return this; });
  //   const gleeQuore = new GleeQuore(asyncapi as AsyncAPIDocumentInterface);
  //   expect(gleeQuore['_internalEvents']).toBeInstanceOf(EventEmitter);
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:auth', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:connect', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:reconnect', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:close', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:server:ready', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:server:connection:open', expect.any(Function));
  //   expect(gleeQuore['_internalEvents'].on).toHaveBeenCalledWith('adapter:server:connection:close', expect.any(Function));

  //   spyEventEmitterOn.mockRestore();

  //   jest.spyOn(gleeQuore, 'runAuth').mockImplementation(async () => {});
  //   jest.spyOn(gleeQuore, 'runLifecycleEvent').mockImplementation(async () => {});

  //   gleeQuore['_internalEvents'].emit('adapter:auth', {
  //     serverName: 'testServer',
  //     authProps: 'testAuthProps',
  //     done: () => {},
  //     doc: asyncapi,
  //   })

  //   expect(gleeQuore.runAuth).toHaveBeenCalledWith({
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     authProps: 'testAuthProps',
  //     done: expect.any(Function),
  //     doc: asyncapi,
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:connect', {
  //     serverName: 'testServer',
  //     connection: () => {},
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onConnect', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     connection: expect.any(Function),
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:reconnect', {
  //     serverName: 'testServer',
  //     connection: () => {},
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onReconnect', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     connection: expect.any(Function),
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:close', {
  //     serverName: 'testServer',
  //     connection: () => {},
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onDisconnect', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     connection: expect.any(Function),
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:server:ready', {
  //     serverName: 'testServer',
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onServerReady', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:server:connection:open', {
  //     serverName: 'testServer',
  //     connection: () => { },
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onServerConnectionOpen', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     connection: expect.any(Function),
  //   });

  //   gleeQuore['_internalEvents'].emit('adapter:server:connection:close', {
  //     serverName: 'testServer',
  //     connection: () => { },
  //   })

  //   expect(gleeQuore.runLifecycleEvent).toHaveBeenCalledWith('onServerConnectionClose', {
  //     app: gleeQuore,
  //     serverName: 'testServer',
  //     connection: expect.any(Function),
  //   });
  // });
});
