export default async function(event) {
  // console.log("---trendingAnime business logic: ",event );
  // console.log("---payload: ",JSON.parse(JSON.stringify(event.payload)));
  const payload = event.payload;
  const channelName = event.channel;
  if(channelName === 'trendingAnime'){
    const animeData = {
      name:payload.name,
      rating: payload.rating,
      genre: payload.genre,
      studio: payload.studio
    }
    return {
      reply: [{
        payload: animeData
      }]
    }
  }
  else if(channelName === 'upcomingAnime'){
    const animeData = {
      name:payload.name,
      genre: payload.genre,
      studio: payload.studio
    }
    return {
      reply: [{
        payload: animeData
      }]
    }
  }
}
