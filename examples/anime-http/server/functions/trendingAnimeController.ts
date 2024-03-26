export default async function (event) {
  const replyPayload = event.payload
  const replyQuery = event.query
  return {
    send: [
      {
        payload: replyPayload,
        query: replyQuery,
        channel: 'trendingAnime'
      }

    ]
  }
}
