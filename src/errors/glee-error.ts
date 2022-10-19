export default class ValidationError extends Error {
  private _errors: Error[]
  private _details: string
  
  constructor({ humanReadableError, errors }) {
    super(humanReadableError)
    this._errors = errors
    this._details = humanReadableError
    this.name = 'GleeError'
  }

  get errors(): any[] {
    return this._errors
  }

  get details(): string {
    return this._details
  }
}
