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
    description: 'lorem ipsum',
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
  generator: {
    folder: "output",
    template: "@asyncapi/markdown-template",
  },
};

describe('generateDocs', () => {
  it('should generate documentation', async () => {
    const testDir = tmpdir() + `/${CONFIG_TEST_DATA.generator.folder}`
    fs.emptyDirSync(testDir)
    const result = await generateDocs(
      TEST_ASYNCAPI_DOCUMENT,
      CONFIG_TEST_DATA,
      testDir
    )
    expect(result).toBe(JSON.stringify(result))
  }, 100000)
})
