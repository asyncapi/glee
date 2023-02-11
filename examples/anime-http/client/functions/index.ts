export default async function (event) {
  console.log("==event==",event);

  return {
    send: [
      {
        server: "trendingAnimeServer",
        payload: event.payload
      },
    ],
  };
}
