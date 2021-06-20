import walkdir from 'walkdir'
import { logInfoMessage } from './logger.js'

export const events = {}

export async function register (dir) {
  const files = await walkdir.async(dir, { return_object: true })
  return Promise.all(Object.keys(files).map(async (filePath) => {
    const { default: fn, lifecycleEvent } = await import(filePath)
    if (!events[lifecycleEvent]) events[lifecycleEvent] = []
    events[lifecycleEvent].push(fn)
  }))
}

export async function run (lifecycleEvent, params) {
  if (!Array.isArray(events[lifecycleEvent])) return
  logInfoMessage(`Running ${lifecycleEvent} lifecycle event...`, {
    highlightedWords: [lifecycleEvent]
  })
  return Promise.all(events[lifecycleEvent].map(fn => fn(params)))
}