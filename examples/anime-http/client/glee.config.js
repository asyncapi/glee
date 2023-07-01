export default async function () {
  return {
    http: {
      client: {
        auth: async ({ serverName }) => {
          if (serverName === "websockets") {
            return {
              token: process.env.TOKEN,
            }
          }
        },
      },
    },
  }
}
