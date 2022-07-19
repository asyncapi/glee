/* eslint-disable no-undef, security/detect-non-literal-fs-filename */
const { WebSocketServer } = require('ws')
const { parse } = require('url')
const { createServer, request } = require('http')

const server = createServer()
const wss = new WebSocketServer({ noServer: true })
const css = new WebSocketServer({ noServer: true })

wss.on('connection', (ws) => {
    console.log('New Connection on /send channel ')
    ws.on('message', (data, isBinary) => {
        css.clients.forEach(client => {
            client.send(data, { binary: isBinary })
        })
    })
})

css.on('connection', () => {
    console.log('New Connection on /listen channel')
})

server.on('upgrade', (req, socket, head) => {
    const { pathname } = parse(req.url)

    if (pathname === '/send') {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, request)
        })
    } else if (pathname === '/listen') {
        css.handleUpgrade(req, socket, head, (ws) => {
            css.emit('connection', ws, request)
        })
    } else {
        socket.destroy()
    }
})

server.listen(4000, () => {
    console.log('Server Listening on port 4000')
})