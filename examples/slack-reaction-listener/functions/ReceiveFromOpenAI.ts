import { GleeFunction } from "@asyncapi/glee"

const myFunction: GleeFunction = async (event) => {
  const { payload } = event.request.request
  const slack_event = payload?.payload?.event

  if (!slack_event) return

  const thread_ts = slack_event.item.ts
  const channel = slack_event.item.channel
  const text = event.payload.choices[0].message.content


  return {
    send: [{
      channel: "SlackPostMessage",
      server: "Slack_HTTPS",
      payload: {
        channel, thread_ts, text
      },
      headers: {
        Authorization: `Bearer ${process.env.SLACK_HTTP}`,
        'Content-Type': 'application/json'
      }
    }]
  }
}

export default myFunction