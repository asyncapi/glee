const ValidationError = require('../errors/validation')
const { validateData } = require('../lib/util')

module.exports = schema => (event, next) => {
  const { humanReadableError, errors, isValid } = validateData(event.payload, schema)
  if (!isValid) {
    return next(new ValidationError({
      humanReadableError,
      errors,
    }))
  }
  next()
}