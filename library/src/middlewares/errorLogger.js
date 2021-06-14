const { red, gray, bold, white } = require('colors/safe')

module.exports = (err, message, next) => {
  if (message && message.inbound) {
    console.error(red('❗  You have received a malformed event. Please review the error below:'))
    console.error(white(bold(err.message || err)))
    return next()
  } else if (message && message.outbound) {
    console.error(red('❗  One of your functions is producing a malformed event. Please review the error below:'))
    console.error(white(bold(err.message || err)))
    return next()
  } else {
    console.error(red(`❗  ${err.message}`))
  }
  
  if (err.stack) console.error(gray(err.stack.substr(err.stack.indexOf('\n') + 1)))
  next()
}