import { readFileSync } from 'fs'
import path from 'path'
import util from 'util'
import chalk from 'chalk'
import emojis from 'emojis'
import wordWrap from 'word-wrap'

export { chalk }

const highlightWords = (words, text) => {
  let result = text

  words.filter(Boolean).forEach(word => {
    result = result.replace(new RegExp(word, 'g'), chalk.white(word))
  })

  return result
}

export const logWelcome = ({
  dev,
  servers,
  dir,
  functionsDir,
  experimentalFlags = [],
}) => {
  const primaryColor = '#08d2a1'
  const bgPrimary = chalk.bgHex(primaryColor)
  const fgPrimary = chalk.hex(primaryColor)
  const fgWarning = chalk.yellow

  const pkg = JSON.parse(readFileSync(path.resolve(dir, 'package.json')))

  console.log(bgPrimary.black(` Glee ${pkg.version} \n`))
  if (dev) {
    console.log(fgPrimary('{}'), chalk.gray('Running in development mode...'))
  }
  console.log(fgPrimary('↙↗'), chalk.gray(wordWrap(`Selected server(s): ${servers.join(', ')}`, { width: 37, indent: '   ' }).trim()))
  if (dir !== process.cwd()) {
    console.log(fgPrimary('./'), chalk.gray(wordWrap(`App directory: ${dir}`, { width: 37, indent: '   ', cut: true }).trim()))
  }
  if (functionsDir !== path.resolve(process.cwd(), 'functions')) {
    console.log(fgPrimary('𝑓×'), chalk.gray(wordWrap(`Functions directory: ${dir}`, { width: 37, indent: '   ', cut: true }).trim()))
  }
  if (experimentalFlags.has('JAVA')) {
    console.log(emojis.unicode(':coffee:'), fgWarning('Java experimental support has been enabled'))
  }
  console.log(chalk.gray('─'.repeat(40)))
}

export const logLineWithIcon = (icon, text, { iconColor = 'cyan', textColor = '#999', highlightedWords = [], disableEmojis = false } = {}) => {
  const iconColorFn = chalk[iconColor] || chalk.hex(iconColor)
  const textColorFn = chalk[textColor] || chalk.hex(textColor)
  icon = !disableEmojis ? emojis.unicode(icon) : icon
  console.log(iconColorFn(icon), textColorFn(highlightWords(highlightedWords, text)))
}

export const logInfoMessage = (text, { highlightedWords = [] } = {}) => {
  logLineWithIcon('ⓘ ', text, {
    highlightedWords: highlightedWords,
  })
}

export const logWarningMessage = (text, { highlightedWords = [] } = {}) => {
  logLineWithIcon(':warning: ', text, {
    highlightedWords: highlightedWords,
    textColor: 'yellow',
  })
}

export const logInboundMessage = (message) => {
  console.log(chalk.reset.blue('↙'), chalk.yellow(message.channel), 'was received from', chalk.gray(message.serverName))
  logJSON(message.payload)
}

export const logOutboundMessage = (message) => {
  const icon = message.broadcast ? '⇶' : '↗'
  const verb = message.broadcast ? 'broadcasted' : 'sent'
  const serverName = message.serverName || 'all servers'
  console.log(chalk.reset.magenta(icon), chalk.yellow(message.channel), 'was', verb ,'to', chalk.gray(serverName))
  logJSON(message.payload)
}

export const logJSON = (json, { error = false } = {}) => {
  const logFn = error ? console.error : console.log
  logFn(util.inspect(json, { depth: null, sorted: true, breakLength: 40, colors: true }))
}

export const logErrorLine = (message, { highlightedWords = [] } = {}) => {
  const icon = chalk.reset.red('x')
  const msg = chalk.gray(emojis.unicode(highlightWords(highlightedWords, message)))
  console.error(`${icon} ${msg}`)
}

export const logError = (error, options = {}) => {
  const { showStack = true } = options
  logErrorLine(error.message, options)
  
  if (typeof error.details === 'string') {
    console.error(chalk.gray(emojis.unicode(error.details)))
  } else if (typeof error.details === 'object') {
    logJSON(error.details, { error: true })
  }

  if (showStack && error.stack) {
    console.error(chalk.gray(error.stack.substr(error.stack.indexOf('\n') + 1)))
  }
}
