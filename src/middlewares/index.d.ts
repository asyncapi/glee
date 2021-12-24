import GleeMessage from "../lib/message";

export type Middleware = (message: GleeMessage, next: Function) => void;
export type ErrorMiddleware = (error: Error, message: GleeMessage, next: Function) => void;
