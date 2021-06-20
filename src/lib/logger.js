const util = require('util')
const chalk = require('chalk')
const wordWrap = require('word-wrap')
const emojis = require('emojis')

const logger = module.exports

logger.chalk = chalk

const highlightWords = (words, text) => {
  let result = text

  words.filter(Boolean).forEach(word => {
    result = result.replace(new RegExp(word, 'g'), chalk.white(word))
  })

  return result
}

logger.logErrorLineWithBlock = (blockText, context, message, options) => {
  options.colorFn = chalk.reset.inverse.bold.red
  logger.logLineWithBlock(blockText, context, message, options)
}

logger.logLineWithIcon = (icon, text, { iconColor = 'cyan', highlightedWords = [], disableEmojis = false } = {}) => {
  const iconColorFn = chalk[iconColor] || chalk.hex(iconColor)
  icon = !disableEmojis ? emojis.unicode(icon) : icon
  console.log(iconColorFn(icon), chalk.hex('#999')(highlightWords(highlightedWords, text)))
}

logger.logInfoMessage = (text, { highlightedWords = [] } = {}) => {
  logger.logLineWithIcon('ⓘ', text, {
    highlightedWords: highlightedWords,
  })
}

logger.logInboundMessage = (message) => {
  console.log(chalk.reset.blue('↘'), chalk.yellow(message.channel), 'was received from', chalk.gray(message.serverName))
  logger.logJSON(message.payload)
}

logger.logOutboundMessage = (message) => {
  const icon = message.broadcast ? '⇶' : '↗'
  const verb = message.broadcast ? 'broadcasted' : 'sent'
  console.log(chalk.reset.magenta(icon), chalk.yellow(message.channel), 'was', verb ,'to', chalk.gray(message.serverName || 'all servers'))
  logger.logJSON(message.payload)
}

logger.logJSON = (json, { error = false } = {}) => {
  const logFn = error ? console.error : console.log
  logFn(util.inspect(json, { depth: null, sorted: true, breakLength: 40, colors: true }))
}

logger.logErrorLine = (message, { highlightedWords = [] } = {}) => {
  const icon = chalk.reset.red('x')
  const msg = chalk.gray(emojis.unicode(highlightWords(highlightedWords, message)))
  console.error(`${icon} ${msg}`)
}

logger.logError = (error, options = {}) => {
  const { showStack = true } = options
  logger.logErrorLine(error.message, options)
  
  if (typeof error.details === 'string') {
    console.error(chalk.gray(emojis.unicode(error.details)))
  } else if (typeof error.details === 'object') {
    logger.logJSON(error.details, { error: true })
  }

  if (showStack && error.stack) {
    console.error(chalk.gray(error.stack.substr(error.stack.indexOf('\n') + 1)))
  }
}
