export default async function () {
  return {
    docs: {
      enabled: false
    },
    ws: {
      client: {
        auth: async ({serverName}) => {
          if(serverName === 'websockets') {
            return {
              token: process.env.TOKEN
            }
          }
        }
      }
    }
  };
}
