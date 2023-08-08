export async function clientAuth({ parsedAsyncAPI, serverName }) {
    return {
      token: process.env.TOKEN,
      // JWT: process.env.TOKEN,
      // username: '',
      // password: "",
      userPass: {
        user: "alec", password: "oviecodes"
      }
    }
}