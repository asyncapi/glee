export default async function (event) {
  const user = event.payload
  console.log(`${user.displayName} has recently signed up. Sending an email to ${user.email}.`)
  throw new Error('Testing errors')
  return {
    broadcast: [{
      server: 'websockets',
      payload: event.payload,
    }]
  }
}