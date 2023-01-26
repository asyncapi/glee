/* eslint-disable no-undef */

//@ts-ignore
import { Message } from '@asyncapi/glee'

export default async function ({ glee, connection }) {
    const animeData = {
      name: "Weathering with You",
      rating: "8",
      genre: "romance",
      studio: "CoMix Wave Films"
    }
    (function updateAnimeList(animeData) {
        setTimeout(() => {
            glee.send(new Message({
                channel: '/trendingAnime',
                connection,
                payload: animeData
            }))
        }, 1000)
    }(animeData))
}


export const lifecycleEvent = 'onServerConnectionOpen'
