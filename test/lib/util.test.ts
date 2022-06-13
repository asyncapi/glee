import 'jest-extended'
import { tmpdir } from 'os'
import {readFileSync, writeFileSync} from 'fs'
import * as util from '../../src/lib/util.js'
import GleeMessage from '../../src/lib/message.js'
import Glee from '../../src/lib/glee.js'

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
      expect(util.arrayHasDuplicates([1,2,3,4])).toBeFalse()
    })

    it('returns true for duplicates', () => {
      expect(util.arrayHasDuplicates([1,2,2,3,4])).toBeTrue()
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
  describe('readGleeConfig', () => {
    it('validates glee file path', () => {
      const CONFIG_TEST_DATA = {
        websocket: {
          httpServer: "customServer",
          adapter: "native", // Default. Can also be 'socket.io' or a reference to a custom adapter.
        },
        cluster: {
          adapter: "redis",
          name: "gleeCluster",
          url: "redis://localhost:6379",
        },
        generator: {
          folder: "output",
          template: "html-template",
        },
      };
      const gleePath = tmpdir() + '/glee.config.js';
      writeFileSync(gleePath, JSON.stringify(CONFIG_TEST_DATA), { encoding: "ascii" });
      const result = JSON.parse(readFileSync(gleePath, { encoding: "ascii" }));
      expect(result).toStrictEqual(CONFIG_TEST_DATA);
    })
  })
})