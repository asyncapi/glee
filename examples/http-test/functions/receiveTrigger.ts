export default async function (event) {
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
      {
        server,
        channel: "GET"
      },
      {
        server,
        channel: "POST"
      },
      {
        server,
        channel: "PATCH"
      },
      {
        server,
        channel: "PUT"
      }
    ],
  }
}
