const { validateData } = require('../lib/util')

module.exports = schema => (event, next) => {
  const { humanReadableError, isValid } = validateData(event.payload, schema)
  if (!isValid) return next(humanReadableError)
  next()
}