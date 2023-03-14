import 'jest-extended'
import ValidationError from '../../src/errors/glee-error'

const errorDetails = {
  humanReadableError: 'This is an error',
  errors: [new Error('Error Occured!')],
}
const error = new ValidationError(errorDetails)

describe('ValidationError', () => {
  describe('errors', () => {
    it('returns errors', () => {
      expect(error.errors).toEqual(errorDetails.errors)
    })
  })

  describe('details', () => {
    it('returns details', () => {
      expect(error.details).toEqual(errorDetails.humanReadableError)
    })
  })
})
