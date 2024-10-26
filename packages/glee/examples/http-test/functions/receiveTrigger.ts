export default async function () {
  const server = 'httpbin.org'
  return {
    reply: [{
      payload: "You have successfully triggered the test server..."
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
