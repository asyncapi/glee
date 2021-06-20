export default class ValidationError extends Error {
  constructor({ humanReadableError, errors }) {
    super(humanReadableError)
    this.errors = errors
    this.details = humanReadableError
    this.name = 'ValidationError'
  }
}