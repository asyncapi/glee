const WebsocketServer = require('ws');


const wss = new WebsocketServer.Server({port: 4000});

wss.on('connection', ws => {
    console.log('New Client Connected');

    setInterval(() => {
        ws.send('Hello');
    }, 2000)

    ws.on('message', (data) => {
        console.log(data);
    })

    ws.on('close', () => {
        console.log('Client closed connection');
    })

    ws.onerror = function (e) {
        console.log('[ERROR] ', e);
    }
})

console.log('WS server is running on port 4000');