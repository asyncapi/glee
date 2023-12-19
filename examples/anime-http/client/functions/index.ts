export default async function () {
  const payload = {
    body: {
      name: 'test12',
      rating: '5',
      studio: 'teststudio',
      genre: 'testgenre',
    },
    query: {
      name: 'test34',
      rating: '5',
      studio: 'teststudio',
      genre: 'testgenre',
    }
  }
  return {
    send: [
      {
        server: 'trendingAnime',
        payload: payload.body,
        query: payload.query
      },
    ],
  }
}
