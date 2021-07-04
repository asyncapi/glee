import ipc from 'node-ipc'

ipc.config.appspace = 'glee.runtime.'
ipc.config.delimiter = '\n'

ipc.connectTo(
  'java',
  function () {
    ipc.of.java.emit(
      'OnUserSignedUp',
      '{"displayName": "Hola","email":"what@email.com"}'
    )
  }
)
