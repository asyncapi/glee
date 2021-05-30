module.exports = () => {
  console.log('Server started...')
  
  return {
    send: [{
      channel: 'server/announce',
      payload: {
        id: process.env.SERVER_ID || String(Date.now()),
      }
    }]
  }
}