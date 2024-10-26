export async function clientAuth({ parsedAsyncAPI, serverName }) {
    return {
      token: process.env.TOKEN,
      userPass: {
        user: process.env.CLIENT_USER,
        password: process.env.CLIENT_PASSWORD,
      }
    }
}