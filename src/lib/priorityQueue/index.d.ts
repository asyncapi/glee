import GleeMessage from '../message.ts'

export interface PriorityStrategy{
  dequeue(): GleeMessage;
  enqueue(message: GleeMessage): void;
  isEmpty(): boolean;
  size(): number;
}