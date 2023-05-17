import { Duplex, TransformOptions } from 'stream'
import { PriorityStrategy } from './index.js'
import { InMemoryStrategy } from './InMemoryStrategy.js'

 export class PriorityStream extends Duplex {
  private _priorityQueue: PriorityStrategy
   private _transforming: boolean

  constructor(options?: TransformOptions){
    super({objectMode: true, highWaterMark: 0, ...options})
    this._priorityQueue = new InMemoryStrategy()
    this._transforming = true

  }
  
  _write(chunk: any, encoding, callback): void {
    this._priorityQueue.enqueue(chunk)
    console.log('queued up: #', this._priorityQueue.size())
    callback()
  }

  _read = () => {
    if(!this._priorityQueue.isEmpty()){
      console.log('dequeued: #', this._priorityQueue.size())
      if(!this.push(this._priorityQueue.dequeue()) && this._transforming){
        console.log('writable in priorityQueue is full!')
        this._transforming = false
        this.once('drain', () => () => {
          console.log('drain event was called.')
          this._transforming = true
          this._read()
        })
      }
    } else {
      setTimeout(() => this._read(), 1000)
    }
  }
}
