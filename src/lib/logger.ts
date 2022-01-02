import { readFileSync } from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import util from 'util'
import chalk from 'chalk'
import emojis from 'emojis'
import wordWrap from 'word-wrap'
import GleeMessage from './message'
import GleeError from '../errors/glee-error.js'

export { chalk }

interface ILogLineWithIconOptions {
  iconColor?: string,
  textColor?: string,
  highlightedWords?: string[],
  disableEmojis?: boolean,
  emptyLinesBefore?: number,
  emptyLinesAfter?: number,
}

interface ILogOptions {
  highlightedWords?: string[],
}

interface ILogErrorOptions {
  highlightedWords?: string[],
  showStack?: boolean,
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const TSLogo = chalk.bgHex('#3178C6').white(' TS')

const highlightWords = (words: string[], text: string) => {
  let result = text

  words.filter(Boolean).forEach(word => {
    result = result.replace(new RegExp(word, 'g'), chalk.white(word))
  })

  return result
}

export const logEmptyLines = (amount: number) => {
  for (let i = 0; i < amount; i++) {
    console.log('')
  }
}

export const logWelcome = ({
  dev,
  servers,
  dir,
  functionsDir,
  experimentalFlags,
  showAppDir = false,
  showFunctionsDir = false,
}) => {
  const primaryColor = '#08d2a1'
  const bgPrimary = chalk.bgHex(primaryColor)
  const fgPrimary = chalk.hex(primaryColor)
  const fgWarning = chalk.yellow
  
  const pkg = JSON.parse(readFileSync(path.resolve(__dirname, '../../package.json')).toString())

  logEmptyLines(1)
  console.log(bgPrimary.black(` Glee ${pkg.version} \n`))
  if (dev) {
    console.log(fgPrimary('{}'), chalk.gray('Running in development mode...'))
  }
  console.log(fgPrimary('↙↗'), chalk.gray(wordWrap(`Selected server(s): ${servers.join(', ')}`, { width: 37, indent: '   ' }).trim()))
  if (showAppDir) {
    console.log(fgPrimary('./'), chalk.gray(wordWrap(`App directory: ${dir}`, { width: 37, indent: '   ', cut: true }).trim()))
  }
  if (showFunctionsDir) {
    console.log(fgPrimary('𝑓×'), chalk.gray(wordWrap(`Functions directory: ${functionsDir}`, { width: 37, indent: '   ', cut: true }).trim()))
  }
  if (experimentalFlags.has('JAVA')) {
    console.log(emojis.unicode(':coffee:'), fgWarning('Java experimental support has been enabled'))
  }
  console.log(chalk.gray('─'.repeat(40)))
}

export const logLineWithIcon = (icon: string, text: string, { iconColor = 'cyan', textColor = '#999', highlightedWords = [], disableEmojis = false, emptyLinesBefore = 0, emptyLinesAfter = 0 }: ILogLineWithIconOptions = {}) => {
  const iconColorFn = chalk[iconColor] || chalk.hex(iconColor)
  const textColorFn = chalk[textColor] || chalk.hex(textColor)
  icon = !disableEmojis ? emojis.unicode(icon) : icon
  if (emptyLinesBefore) logEmptyLines(emptyLinesBefore)
  console.log(iconColorFn(icon), textColorFn(highlightWords(highlightedWords, text)))
  if (emptyLinesAfter) logEmptyLines(emptyLinesAfter)
}

export const logInfoMessage = (text: string, { highlightedWords = [] }: ILogOptions = {}) => {
  logLineWithIcon('ⓘ ', text, {
    highlightedWords,
  })
}

export const logWarningMessage = (text: string, { highlightedWords = [] }: ILogOptions = {}) => {
  logLineWithIcon(':warning: ', text, {
    highlightedWords,
    textColor: 'yellow',
  })
}

export const logJSON = (json: object | Array<any>, { error = false } = {}) => {
  const logFn = error ? console.error : console.log
  logFn(util.inspect(json, { depth: null, sorted: true, breakLength: 40, colors: true }))
}

export const logInboundMessage = (message: GleeMessage) => {
  console.log(chalk.reset.blue('↙'), chalk.yellow(message.channel), 'was received from', chalk.gray(message.serverName))
  logJSON(message.payload)
}

export const logOutboundMessage = (message: GleeMessage) => {
  const icon = message.broadcast ? '⇶' : '↗'
  const verb = message.broadcast ? 'broadcasted' : 'sent'
  const serverName = message.serverName || 'all servers'
  console.log(chalk.reset.magenta(icon), chalk.yellow(message.channel), 'was', verb ,'to', chalk.gray(serverName))
  logJSON(message.payload)
}

export const logErrorLine = (message: string, { highlightedWords = [] }: ILogOptions = {}) => {
  const icon = chalk.reset.red('x')
  const msg = chalk.gray(emojis.unicode(highlightWords(highlightedWords, message)))
  console.error(`${icon} ${msg}`)
}

export const logError = (error: GleeError | Error, options: ILogErrorOptions = {}) => {
  const { showStack = true } = options
  logErrorLine(error.message, options)
  
  if (error instanceof GleeError) {
    if (typeof error.details === 'string') {
      console.error(chalk.gray(emojis.unicode(error.details)))
    } else if (typeof error.details === 'object') {
      logJSON(error.details, { error: true })
    }
  }

  if (showStack && error.stack) {
    console.error(chalk.gray(error.stack.substring(error.stack.indexOf('\n') + 1)))
  }
}

export const logTypeScriptMessage = (message: string) => {
  console.log(TSLogo, message)
}

export const logTypeScriptError = (code: number, message: string, fileName: string, line: number, character: number) => {
  const fileInfo = `${chalk.cyan(fileName)}:${chalk.yellow(line + 1)}:${chalk.yellow(character + 1)}`
  const error = `${chalk.red('error')} ${chalk.gray(`TS${code}:`)}`
  console.error(`${TSLogo} ${fileInfo} - ${error} ${message}`)
}