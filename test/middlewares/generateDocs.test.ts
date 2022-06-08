import 'jest-extended'
import generateDocs from '../../src/middlewares/generateDocs'
import AsyncAPIDocument from "@asyncapi/parser/lib/models/asyncapi"

const TEST_ASYNCAPI_DOCUMENT = new AsyncAPIDocument({
  asyncapi: "2.2.0",
  servers: {
    test: {
      url: "mqtt://fake-url",
      protocol: "mqtt",
    },
  },
  channels: {
    "test/channel": {
      publish: {
        message: {
          payload: {
            type: "string",
          },
        },
      },
    },
  },
});

describe('generateDocs', () => {
    
})
