const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const env = process.env
const directory = process.cwd() // TODO: Make it configurable

const config = require(path.resolve(directory, 'config.json'))

module.exports = {
  ...config,
  ...env,
}