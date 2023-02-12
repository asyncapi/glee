export default async function (event) {
  const payload = event.payload

  return {
    send: [
      {
        server: "trendingAnime",
        payload: payload
      },
    ],
  }
}
