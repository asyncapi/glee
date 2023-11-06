import { GleeFunction } from "@asyncapi/glee"

const myFunction: GleeFunction = async ({ payload }) => {
  const { envelope_id } = payload
  const reaction = payload?.payload?.event?.reaction
  if (!reaction) return
  return {
    reply: [
      {
        payload: {
          envelope_id
        }
      }
    ],
    send: [{
      server: "OpenAI_HTTPS",
      channel: "OpenAICompletion",
      headers: {
        'Authorization': `Bearer ${process.env.CHAT_API}`
      },
      payload: {
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": `Someone reacted with "${reaction}" emoji to my message on Slack, write something fun and short to them.` }],
        temperature: 0.7
      }
    }]
  }


}

export default myFunction