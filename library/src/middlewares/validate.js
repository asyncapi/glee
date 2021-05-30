const Ajv = require("ajv")

const ajv = new Ajv({ allErrors: true })

module.exports = schema => (event, next) => {
  const validate = ajv.compile(schema)
  const valid = validate(event.payload)
  if (!valid) return next(validate.errors)
  next()
}