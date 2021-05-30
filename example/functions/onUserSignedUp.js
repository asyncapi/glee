module.exports = async function (event, context) {
  const user = event.payload
  console.log(`${user.displayName} has recently signed up. Sending an email to ${user.email}.`)
  return {
    send: [{
      channel: 'email/sent',
      payload: {
        email: user.email,
        timestamp: new Date().toISOString()
      },
    }]
  }
}