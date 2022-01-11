import { register } from '../../src/lib/functions'
import fs from 'fs/promises'

jest.mock('fs/promises', () => {
  return {
    stat: jest.fn().mockResolvedValue({
      isDirectory: () => false
    })
  }
})

describe('functions', () => {
  describe('register', () => {
    it('registers a function', async () => {
      await register('test.js')
      expect(fs.stat).toHaveBeenCalled()
    })
  })
})