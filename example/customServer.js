const path = require('path')
const fs = require('fs')
const { createServer } = require('http')

module.exports = createServer((req, res) => {
  let pathname
  
  try {
    pathname = new URL(req.url).pathname
  } catch (e) {
    pathname = req.url
  }

  if (pathname === '/socket.io') {
    res.end(fs.readFileSync(path.resolve(__dirname, 'socket.io.html'), { encoding: 'utf-8' }))
  } else if (pathname === '/') {
    res.end(fs.readFileSync(path.resolve(__dirname, 'index.html'), { encoding: 'utf-8' }))
  } else {
    res.writeHead(404).end()
  }
}).listen(3005, (err) => {
  if (err) throw err
  console.log('Custom server running on http://localhost:3005')
})
