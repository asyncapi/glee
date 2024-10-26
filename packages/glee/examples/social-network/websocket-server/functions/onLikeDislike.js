import { Low, JSONFile } from 'lowdb'
const db = new Low(new JSONFile('../db.json'))

export default async function (event) {
  await db.read()
  const { likes } = db.data
  const { type } = event.payload
  const { postId, userId } = event.payload.data
  const existingLikeIndex = likes.findIndex(like =>
    like.postId === postId && like.userId === userId
  )

  if (type === 'like') {
    if (existingLikeIndex === -1) {
      likes.push({ postId, userId })
      await db.write()
    }
  } else if (existingLikeIndex !== -1) {
    likes.splice(existingLikeIndex)
    await db.write()
  }

  const totalCount = likes.filter(like => like.postId === postId).length

  return {
    send: [{
      server: 'websockets',
      payload: {
        type: 'likes_count_updated',
        data: {
          postId,
          totalCount,
        },
      }
    }],
    reply: [
      {
        channel: '/',
        payload: {
          type: 'likes_count_updated',
          data: {
            postId,
            totalCount
          }
        }
      }
    ],
    ...(
      type === 'like' && {
        send: [{
          channel: 'post/liked',
          payload: {
            postId,
            userId,
          },
          server: 'mosquitto',
        }]
      }
    )
  }
}
