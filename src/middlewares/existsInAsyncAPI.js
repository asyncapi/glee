export default asyncapi => (event, next) => {
  if (typeof event.channel !== 'string') return next(new Error(`Invalid channel name: ${event.channel}.`))
  if (asyncapi.channel(event.channel)) return next()
  next(new Error(`Channel ${event.channel} is not defined in the AsyncAPI file.`))
}