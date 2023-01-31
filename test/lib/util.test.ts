import 'jest-extended'
import * as util from '../../src/lib/util.js'
import GleeMessage from '../../src/lib/message.js'
import Glee from '../../src/lib/glee.js'
import { join } from 'path'
import { mkdirSync, existsSync } from 'fs'
import { remove } from 'fs-extra'

describe('util', () => {
  const GLEE_DIR = join(process.cwd(), './glee-test')
  const GENERATED_FUNCTION = `${GLEE_DIR}/functions/http___localhost_3000.js`
  beforeAll(() => {
    try {
      mkdirSync(GLEE_DIR)
    } catch (err) {}
  })
  afterAll(() => {
    remove(GLEE_DIR)
  })

  describe('generateUrlFunction', () => {
    it('should generate a function will the correct options', () => {
      util.generateUrlFunction(GLEE_DIR, 'http://localhost:3000', {
        method: 'get',
        url: 'http://localhost:3000',
      })
      expect(existsSync(GENERATED_FUNCTION)).toBe(true)
    })
  })

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
          header: 'value',
        },
        channel: 'fake-channel',
        serverName: 'fake-server',
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
})
