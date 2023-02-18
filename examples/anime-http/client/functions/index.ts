export default async function (event) {
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
  console.log("event: ", event)

  return {
    send: [
      {
        server: "trendingAnime",
        payload: payload,
      },
    ],
  }
}
