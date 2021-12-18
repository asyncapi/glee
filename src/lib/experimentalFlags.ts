export default new Map(
  Object
    .keys(process.env)
    .filter(flag => flag.startsWith('GLEE_EXPERIMENTAL_'))
    .map(flag => [flag.substr('GLEE_EXPERIMENTAL_'.length), process.env[flag]])
)