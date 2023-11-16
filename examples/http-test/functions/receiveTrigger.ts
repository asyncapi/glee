export default async function (event) {
  console.log("infunction")
  const server = "httpbin.org"
  return {
    reply: [{
      payload: "HiHiHi"
    }],
    send: [
      {
        server,
        channel: "DELETE"
      },
    ],
  }
}
