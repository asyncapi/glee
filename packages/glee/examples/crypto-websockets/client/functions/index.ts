import path from 'path'
import fs from 'fs'
import asciichart from 'asciichart'

export default async function (event) {
    const payload = event.payload
    const dbPath = path.resolve('./db.json')
    const read = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'))
    const write = (data) => { fs.writeFileSync(dbPath, data, { encoding: 'utf-8' }) }
    let db
    switch (payload.status) {
        case 'started':
            write(JSON.stringify([payload]))
            break
        case 'intransit':
            db = read()
            write(JSON.stringify([...db, payload]))
            break
        case 'finished':
            db = read()
            const values = [...db, payload]
            console.log(asciichart.plot(values.map(v => v.price), {height: 8}))
    }
    return {
        send: []
    }
}