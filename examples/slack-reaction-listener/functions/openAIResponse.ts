import { GleeFunction } from "@asyncapi/glee"

const myFunction: GleeFunction = async (event) => {
  const { payload } = event.request.request;
  const slack_event = payload?.payload?.event

  if (!slack_event) return

  const thread_ts = slack_event.item.ts
  const channel = slack_event.item.channel
  const text = event.payload.choices[0].message.content


  return {
    payload: {
      channel, thread_ts, text
    },
    headers: {
      Authorization: `Bearer ${process.env.SLACK_HTTP}`,
    }
  }

}

export default myFunction