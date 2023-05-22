import { Duplex } from 'stream'
import GleeMessage from '../message.js'
import { logInfoMessage } from '../logger.js'
import { PriorityStrategy } from '../priorityQueue/index.js'
import { InMemoryStrategy } from '../priorityQueue/InMemoryStrategy.js'

class PriorityStream extends Duplex {
  private _priorityQueue: PriorityStrategy
   private _transforming: boolean

  constructor(){
    super({objectMode: true, highWaterMark: 1})
    this._priorityQueue = new InMemoryStrategy()
    this._transforming = true

  }
  
  _write(message: GleeMessage, encoding, callback): void {
    this._priorityQueue.enqueue(message)
    logInfoMessage(`Message with ID: ${message.uuid} Added to the priority queue.`, {highlightedWords: [message.uuid]})
    logInfoMessage(`${this._priorityQueue.size()} messages are in priority queue.`, {highlightedWords: [this._priorityQueue.size().toString()]})
    callback()
  }

  _read = () => {
    if(!this._priorityQueue.isEmpty()){
      if(!this.push(this._priorityQueue.dequeue()) && this._transforming){
        console.log('writable in priorityQueue is full!')
        this._transforming = false
        this.once('drain', () => () => {
          this._transforming = true
          this._read()
        })
      }
    } else {
      setTimeout(() => this._read(), 1000)
    }
  }
}

export const priorityQueue = new PriorityStream()