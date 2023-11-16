import 'jest-extended'
import * as util from '../../src/lib/util.js'
import GleeMessage from '../../src/lib/message.js'
import Glee from '../../src/lib/glee.js'
import { Channel } from '@asyncapi/parser/esm/models/v3/channel.js'

describe('util', () => {
  describe('getParams', () => {
    it('returns params from channel regex', () => {
      const params = util.getParams('async/:param', 'async/api')
      expect(params).toStrictEqual({ param: 'api' })
    })
  })

  describe('matchChannel', () => {
    it('matches channel name', () => {
      expect(util.matchChannel('async/api', 'async/api')).toBeTrue()
      expect(util.matchChannel('async/api', 'async/glee')).toBeFalse()
    })
  })

  describe('arrayHasDuplicates', () => {
    it('returns false for no duplicates', () => {
      expect(util.arrayHasDuplicates([1, 2, 3, 4])).toBeFalse()
    })

    it('returns true for duplicates', () => {
      expect(util.arrayHasDuplicates([1, 2, 2, 3, 4])).toBeTrue()
    })
  })

  describe('gleeMessageToFunctionEvent', () => {
    it('returns function event', () => {
      const glee = new Glee()
      const message = new GleeMessage({
        payload: 'Hello World',
        headers: {
          header: 'value'
        },
        channel: 'fake-channel',
        serverName: 'fake-server'
      })
      const functionEvent = util.gleeMessageToFunctionEvent(message, glee)

      expect(functionEvent.payload).toBe(message.payload)
      expect(functionEvent.headers).toEqual(message.headers)
      expect(functionEvent.channel).toEqual(message.channel)
      expect(functionEvent.connection).toBeUndefined()
      expect(functionEvent.serverName).toEqual(message.serverName)
      expect(functionEvent.glee).toBe(glee)
    })
  })

  describe('extractExpressionValueFromMessage', () => {
    it('extracts value from message headers', () => {
      const message = { headers: { 'x-header': 'header value' }, payload: {} }
      const expression = '$message.header#/x-header'
      expect(util.extractExpressionValueFromMessage(message, expression)).toBe('header value')
    })

    it('extracts value from message payload', () => {
      const message = { headers: {}, payload: { key: 'payload value' } }
      const expression = '$message.payload#/key'
      expect(util.extractExpressionValueFromMessage(message, expression)).toBe('payload value')
    })

    it('throws error for invalid expression', () => {
      const message = { headers: {}, payload: {} }
      const expression = '$invalid.expression'
      expect(() => util.extractExpressionValueFromMessage(message, expression)).toThrowError('is invalid')
    })
  })

  describe('applyAddressParameters', () => {
    const mockChannelParameter = {
      id: () => 'param',
      location: () => '$message.header#/param', // includes location as a function
      json: () => ({ default: '123' })
    }

    const mockChannel = {
      address: () => 'http://api/{param}',
      parameters: () => [mockChannelParameter]
    } as Channel

    const mockMessage = {
      headers: { param: '456' },
      payload: {}
    } as unknown as GleeMessage
    it('replaces parameters in the address with values from message', () => {
      const result = util.applyAddressParameters(mockChannel, mockMessage)
      expect(result).toBe('http://api/456') // Assuming that '456' is the intended substitution from the headers
    })

    it('uses default value when parameter is not found in message', () => {
      const mockMessageWithNoParam = {
        headers: {},
        payload: {}
      } as unknown as GleeMessage
      const result = util.applyAddressParameters(mockChannel, mockMessageWithNoParam)
      expect(result).toBe('http://api/123') // The default value '123' should be used
    })

    it('throws an error when a required parameter is missing and no default is provided', () => {
      const mockChannelWithNoDefault = {
        address: () => 'http://api/{param}',
        parameters: () => [{ id: () => 'param', json: () => ({}) }] // No default value provided
      } as Channel
      const mockMessageWithNoParam = {
        headers: {},
        payload: {}
      } as GleeMessage
      expect(() => util.applyAddressParameters(mockChannelWithNoDefault, mockMessageWithNoParam)).toThrow()
    })
  })
})
