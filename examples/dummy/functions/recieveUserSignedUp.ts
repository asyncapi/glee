export default async function (event) {
  const user: any = event.payload
  console.log(`${user.displayName} has recently signed up. Sending an email to ${user.email}.`)
  // Send an email to the user here

  return {
    send: [{
      server: 'mosquitto',
      channel: 'userSignedUp',
      payload: event.payload,
    }]
  }
}
