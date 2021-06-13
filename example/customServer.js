const path = require('path')
const fs = require('fs')
const { createServer } = require('http')
const { parse } = require('url')
const glee = require('@asyncapi/glee')

const httpServer = createServer((req, res) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(req.url, true)
  const { pathname } = parsedUrl

  if (pathname === '/') {
    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html'), { encoding: 'utf-8' }))
  } else {
    res.writeHead(404).end()
  }
}).listen(3000, (err) => {
  if (err) throw err
  console.log('Custom server running on http://localhost:3000')
})

glee({ httpServer })