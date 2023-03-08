export default async function (event) {
  const replyPayload = event.payload
  const replyQuery = event.query
  return {
    reply: [
      {
        payload: replyPayload,
        query: replyQuery
      },
    ],
  }
}
