import fetch from 'node-fetch'
import { Low, JSONFile } from 'lowdb'
const db = new Low(new JSONFile('../db.json'))

export default async function (event) {
  await db.read()
  const { users, posts } = db.data
  const { postId, userId } = event.payload
  const postOwner = users[posts.find(p => p.id === postId).userId]
  const userWhoLiked = users[userId]

  if (postOwner.id === userWhoLiked.id) {
    console.log(`It's great that you like yourself but I'm not going to send a notification 😊`)
  } else {
    console.log('Sending message to Slack...')
    fetch(process.env.SLACK_URL, {
      method: 'POST',
      body: JSON.stringify({
        text: `Hey ${postOwner.slackId || postOwner.name}!\n${userWhoLiked.name} liked your post: http://localhost:3000/post/${postId}?user=${postOwner.id}`,
      }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
