const { logError } = require('../lib/logger')
const ValidationError = require('../errors/validation')

module.exports = (err, message, next) => {
  if (err instanceof ValidationError) {
    if (message && message.inbound) {
      err.message = 'You have received a malformed event or there has been error processing it. Please review the error below:'
      logError(err, { showStack: false })
    } else if (message && message.outbound) {
      err.message = 'One of your functions is producing a malformed event or there has been an error processing it. Please review the error below:'
      logError(err, { showStack: false })
    }
  } else {
    logError(err)
  }
  next()
}