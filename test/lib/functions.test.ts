import fs from 'fs/promises'
import { register } from '../../src/lib/functions'

let statDoesNotExist: boolean
let statErrorCode: string
let isDirectoryReturnValue: boolean

restoreDefaultValues()

function restoreDefaultValues() {
  statDoesNotExist = false
  statErrorCode = 'ENOENT'
  isDirectoryReturnValue = true
}

function statIsDirectoryReturnsFalse() {
  return {
    stat: jest.fn(async () => {
      if (statDoesNotExist) {
        throw { code: statErrorCode }
      }
      return {
        isDirectory: () => false
      }
    })
  }
}
jest.mock('fs/promises', statIsDirectoryReturnsFalse)

describe('functions', () => {
  afterAll(() => {
    jest.restoreAllMocks()
  })

  beforeEach(restoreDefaultValues)
  
  describe('register', () => {
    it('fails to register functions if the functions directory is not a directory', async () => {
      isDirectoryReturnValue = false
      await register('test-functions')
      expect(fs.stat).toHaveBeenCalled()
    })
    
    it('fails to register functions if the directory does not exist', async () => {
      statDoesNotExist = true
      await register('test-functions')
      expect(fs.stat).toHaveBeenCalled()
    })
    
    it('throws if an unexpected error happens calling fs.stat', async () => {
      statDoesNotExist = true
      statErrorCode = 'something-else'
      await expect(async () => {
        await register('test-functions')
      }).rejects.toEqual({ code: statErrorCode })
    })
  })
})