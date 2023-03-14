import 'jest-extended'
import json2string from '../../src/middlewares/json2string.js'
import GleeMessage from '../../src/lib/message.js'

describe('json2string', () => {
  it('converts object to json string', (done) => {
    const payload = {
      test: 'value',
    }

    const fakeMessage = new GleeMessage({
      payload,
    })

    json2string(fakeMessage, () => {
      expect(fakeMessage.payload).toBe(JSON.stringify(payload))
      done()
    })
  })
})
