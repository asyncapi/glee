import 'jest-extended'
import GleeMessage from '../../src/lib/message.js'

describe('GleeMessage', () => {
  describe('headers', () => {
    it('sets the headers', () => {
      const message = new GleeMessage({})
      const headers = message.headers = { 'header': 'value' }
      expect(message.headers).toEqual(headers)
    })
  })

  describe('params', () => {
    it('sets the params', () => {
      const message = new GleeMessage({})
      const params = message.params = { 'param': 'value' }
      expect(message.params).toEqual(params)
    })
  })
})