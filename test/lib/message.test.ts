import 'jest-extended'
import GleeMessage from '../../src/lib/message.js'

describe('GleeMessage', () => {
  describe('headers', () => {
    it('sets the headers', () => {
      const message = new GleeMessage({})
      const headers = message.headers = {'header': 'value'}
      expect(message.headers).toEqual(headers)
    })
  })

  describe('params', () => {
    it('sets the params', () => {
      const message = new GleeMessage({})
      const params = message.params = {'param': 'value'}
      expect(message.params).toEqual(params)
    })
  })

  describe('reply', () => {
    it('prepares and emits the message as reply', done => {
      const message = new GleeMessage({})
      const replyDetails = {
        payload: 'This is a reply',
        headers: {
          reply: true
        },
        channel: 'fake/reply'
      }

      message.on('send', reply => {
        expect(reply).toBeInstanceOf(GleeMessage)
        expect(reply.payload).toBe(replyDetails.payload)
        expect(reply.headers).toEqual(replyDetails.headers)
        expect(reply.channel).toBe(replyDetails.channel)

        done()
      })

      message.reply(replyDetails)
    })
  })
})