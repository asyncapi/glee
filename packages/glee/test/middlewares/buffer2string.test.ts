import 'jest-extended'
import buffer2string from '../../src/middlewares/buffer2string.js'
import GleeMessage from '../../src/lib/message.js'

describe('buffer2string', () => {
  it('converts buffer to string', done => {
    const fakeMessage = new GleeMessage({
      payload: Buffer.from('Test Message', 'utf-8')
    })

    buffer2string(fakeMessage, () => {
      expect(fakeMessage.payload).toBe('Test Message')
      done()
    })
  })
})