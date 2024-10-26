import 'jest-extended'
import string2json from '../../src/middlewares/string2json.js'
import GleeMessage from '../../src/lib/message.js'

describe('string2json', () => {
  it('converts json string to object', done => {
    const payload = {
      test: 'value'
    }

    const fakeMessage = new GleeMessage({
      payload: JSON.stringify(payload)
    })

    string2json(fakeMessage, () => {
      expect(fakeMessage.payload).toEqual(payload)
      done()
    })
  })
})