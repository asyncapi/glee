export async function clientAuth({ parsedAsyncAPI, serverName }) {
  
  // const secSchemes = parsedAsyncAPI.servers()[serverName].json("security").map((sec) => {
  //   const secName = Object.keys(sec)[0]
  //   return parsedAsyncAPI.components().securityScheme(secName)
  // })
  // console.log(secSchemes)
    return {
      token: process.env.TOKEN,
      username: '',
      password: ""
      // userpass: {
      //   username: "", password: ""
      // }
    }
}