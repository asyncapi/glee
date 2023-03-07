export default async function () {
  const payload = {
    body: {
      name: 'test',
      rating: '5',
      studio: 'teststudio',
      genre: 'testgenre',
    },
    query: {
      name: 'test',
      rating: '5',
      studio: 'teststudio',
      genre: 'testgenre',
    }
  }
  return {
    send: [
      {
        server: 'trendingAnime',
        payload: payload,
      },
    ],
  }
}
