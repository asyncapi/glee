const { logInboundMessage, logOutboundMessage } = require('../lib/logger')

module.exports = (message, next) => {
  if (message.inbound) {
    logInboundMessage(message)
  } else if (message.outbound) {
    logOutboundMessage(message)
  }
  next()
}