import { MaxPriorityQueue, IGetCompareValue } from '@datastructures-js/priority-queue'
import GleeMessage from '../message.js'
import { PriorityStrategy } from './index.js'

const compareMessages: IGetCompareValue<GleeMessage> = (a) => a.qos

export class InMemoryStrategy implements PriorityStrategy{
  private _priorityQueue: MaxPriorityQueue<GleeMessage>

  constructor(){
    this._priorityQueue = new MaxPriorityQueue<GleeMessage>(compareMessages)
  }
  dequeue(): GleeMessage {
    return this._priorityQueue.dequeue()
  }
  enqueue(chunk: GleeMessage): void {
    this._priorityQueue.enqueue(chunk)
  }
  isEmpty(): boolean {
    return this._priorityQueue.isEmpty()
  }
  size(): number {
    return this._priorityQueue.size()
  }

}