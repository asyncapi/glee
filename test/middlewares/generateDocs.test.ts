import 'jest-extended'
import { tmpdir } from 'os'
import fs from 'fs-extra'
import generateDocs from '../../src/middlewares/generateDocs'
import AsyncAPIDocument from '@asyncapi/parser/lib/models/asyncapi'

const TEST_ASYNCAPI_DOCUMENT = new AsyncAPIDocument({
  asyncapi: '2.2.0',
  info: {
    title: 'Account Service',
    version: '1.0.0',
    description: 'lorem ipsum'
  },
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
          },
        },
      },
    },
  },
})

const CONFIG_TEST_DATA = {
  websocket: {
    httpServer: 'customServer',
    adapter: 'native', // Default. Can also be 'socket.io' or a reference to a custom adapter.
  },
  cluster: {
    adapter: 'redis',
    name: 'gleeCluster',
    url: 'redis://localhost:6379',
  },
  generator: {
    folder: 'output',
    template: 'markdown-template',
  },
}

describe('generateDocs', () => {
  it('should generate documentation', async () => {
    const testDir = tmpdir() + `/${CONFIG_TEST_DATA.generator.folder}`;
    fs.emptyDirSync(testDir);
    let err: Error | undefined;

    try {
      const result = await generateDocs(
        TEST_ASYNCAPI_DOCUMENT,
        CONFIG_TEST_DATA,
        testDir
      );
      expect(result).toBe('done');
    } catch (e) {
      err = e;
    }

    expect(err).toBeUndefined();
  }, 100000);
});
