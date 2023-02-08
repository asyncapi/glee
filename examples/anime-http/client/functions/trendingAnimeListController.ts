import path from 'path'
import fs from 'fs'

export default async function (event) {
    const payload = event.payload
    const dbPath = path.resolve('./db.json')
    const read = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
    const write = (data) => { fs.writeFileSync(dbPath, data, { encoding: 'utf-8' }) }
    const db = read()
    write(JSON.stringify([...db, payload]))
    return {
        send: []
    }
}
