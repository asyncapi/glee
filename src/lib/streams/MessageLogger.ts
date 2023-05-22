import {Transform, TransformCallback} from 'stream'
import chalk from 'chalk'
import GleeMessage from '../message.js'
import { logJSON } from '../logger.js'

class InboundMessageLogger extends Transform {
  constructor() {
    super({ objectMode: true }) // We want to work with objects (GleeMessages), not buffers
  }

  _transform(message: GleeMessage, encoding: BufferEncoding, callback: TransformCallback) {
    if (message.isInbound()) {
      this._logInboundMessage(message)
    } else if (message.isOutbound()) {
      this._logOutboundMessage(message)
    } else {
      callback(new Error('The type of the message is unspecified. can\'t log it.'))
    }
    logJSON(message.payload)
    callback(null, message)
  }
  private _logOutboundMessage(message: GleeMessage) {
    const icon = message.broadcast ? '⇶' : '↗'
    const serverName = message.serverName || 'all servers'
    const verb = message.broadcast ? 'broadcasted' : 'sent'
    console.log(chalk.reset.magenta(icon), chalk.yellow(message.channel), 'was', verb ,'to', chalk.gray(serverName))
    logJSON(message.payload)
  }

  private _logInboundMessage(message: GleeMessage){
    console.log(chalk.reset.blue('↙'), chalk.yellow(message.channel), 'was received from', chalk.gray(message.serverName))
  }

  
}

export const logInboundMessage = new InboundMessageLogger()
