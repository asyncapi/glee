import path from 'path'
import { getConfigs } from '../configs.js'
import { logWarningMessage } from '../logger.js'
import { functions } from '../functions.js'

const {
  GLEE_DIR,
  GLEE_FUNCTIONS_DIR,
} = getConfigs()

export function runJS(operationId, messageId, message) {
  return new Promise((resolve, reject) => {
    functions[operationId]
      .run(message)
      .then((res) => {
        resolve(res)
      })
      .catch(err => {
        if (err.code === 'ERR_MODULE_NOT_FOUND') {
          const functionsPath = path.relative(GLEE_DIR, '.glee', GLEE_FUNCTIONS_DIR)
          const missingFile = path.relative(GLEE_FUNCTIONS_DIR, `${filePath}.js`)
          const missingPath = path.join(functionsPath, missingFile)
          logWarningMessage(`Missing function file ${missingPath}.`, {
            highlightedWords: [missingPath],
          })
        } else {
          reject(err)
        }
      })
  })
}