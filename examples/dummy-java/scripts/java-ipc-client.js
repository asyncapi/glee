import ipc from 'node-ipc'

ipc.config.appspace = 'glee.runtime.'
ipc.config.delimiter = '\n'

ipc.connectTo(
  'java',
  function () {
    ipc.of.java.emit(
      'OnUserSignedUpFunction',
      JSON.stringify({
        headers: {
          customHeader: 'test',
        },
        payload: {
          displayName: 'Hola',
          email: 'what@email.com',
        },
        channel: 'user/signedup',
        server: 'mosquitto',
        messageId: 'UserSignedUp',
      })
    )

    ipc.of.java.on('OnUserSignedUpFunction', (msg) => {
      console.log(msg)
    })
  }
)
