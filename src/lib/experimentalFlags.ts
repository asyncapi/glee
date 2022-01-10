const environmentVariables = new Map(Object.entries(process.env))

export default new Map(
  Object
    .keys(process.env)
    .filter(flag => flag.startsWith('GLEE_EXPERIMENTAL_'))
    .map(flag => [flag.substring('GLEE_EXPERIMENTAL_'.length), environmentVariables.get(flag)])
)
