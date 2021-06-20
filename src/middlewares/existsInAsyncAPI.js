export default asyncapi => (event, next) => {
  if (asyncapi.channel(event.channel)) return next()
  next(new Error(`Channel ${event.channel} is not defined in the AsyncAPI file.`))
}