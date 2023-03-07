export default async function (event) {
  const payload = event.payload
  const replyPayload = {}
  if (payload.body && Object.keys.length) {
    replyPayload['body'] = payload.body
  }
  if (payload.query && Object.keys.length) {
    replyPayload['query'] = payload.query
  }
  return {
    reply: [
      {
        payload: replyPayload,
      },
    ],
  }
}
