import { GleeFunction } from "@asyncapi/glee"
enum EVENT_TYPE {
  EVENTS_API = "events_api",
  CONNECTED = "hello"
}
const myFunction: GleeFunction = async ({ payload }) => {
  const reaction = payload?.payload?.event?.reaction
  if (!reaction) return
  return {
    headers: {
      'Authorization': `Bearer ${process.env.CHAT_API}`
    },

    payload: {
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": `Someone reacted with "${reaction}" to my message on Slack, write something fun and short to them.` }],
      temperature: 0.7
    }
  }


}

export default myFunction