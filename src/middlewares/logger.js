const util = require('util')
const { yellow, blue, magenta } = require('colors')

module.exports = (message, next) => {
  const arrow = message.inbound ? blue('←') : magenta('→')
  const action = message.inbound ? 'received' : 'sent'
  console.log(`${arrow} ${yellow(message.channel)} was ${action}:`)
  console.log(util.inspect(message.payload, { depth: null, colors: true }))
  next()
}