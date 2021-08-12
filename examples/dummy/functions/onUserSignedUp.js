export default async function (event) {
  const user = event.payload
  if (user.displayName === 'error') throw new Error('Testing errors')
  console.log(`${user.displayName} has recently signed up. Sending an email to ${user.email}.`)
}