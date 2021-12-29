export default class ValidationError extends Error {
  private _errors: any[]
  private _details: string
  
  constructor({ humanReadableError, errors }) {
    super(humanReadableError)
    this._errors = errors
    this._details = humanReadableError
    this.name = 'ValidationError'
  }

  get errors(): any[] {
    return this._errors
  }

  get details(): string {
    return this._details
  }
}