export default async function () {
  const payload = {
    body: {
      name: "tets",
      rating: 5,
      studio: "teststudio",
      genre: "testgenre",
    },
    query: {
      name: "tets",
      rating: "5",
      studio: "teststudio",
      genre: "testgenre",
    }
  }
  return {
    send: [
      {
        server: "trendingAnime",
        payload: payload,
      },
    ],
  }
}
