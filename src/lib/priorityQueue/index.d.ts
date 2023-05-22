import GleeMessage from '../message.js'

export interface PriorityStrategy{
  dequeue(): GleeMessage;
  enqueue(message: GleeMessage): void;
  isEmpty(): boolean;
  size(): number;
}