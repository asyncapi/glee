export default async function () {
  return {
    ws: {
      client: {
        auth: async ({ serverName }) => {
          if (serverName === 'websockets') {
            return {
              token: process.env.TOKEN,
            }
          }
        },
      },
    },
  }
}
