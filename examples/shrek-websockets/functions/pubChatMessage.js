/* eslint-disable no-undef */

import fetch from 'node-fetch'

export default async function (event) {
  const chatMessage = event.payload
  const messageToShrek = chatMessage ? encodeURIComponent(chatMessage) : ''
  const defaultAnswer = 'Shrek is out sorry. He\'s busy rescuing the princess.'
  let shrekAnswer = defaultAnswer
  let botAnswer

  try {
    botAnswer = await fetch(`https://api.wit.ai/message?q=${messageToShrek}`, {
      headers: { Authorization: `Bearer ${process.env.CHATBOT_TOKEN}` }
    })
  } catch (e) {
    throw new Error(`Having issues communicating with the bot: ${e}`)
  }

  if (botAnswer) {
    const wrongQuestionAnswer = 'Is it you Donkey!? Ask a better question!'
    const answerObject = await botAnswer.json()
    if (answerObject.error) {
      throw new Error(answerObject.error)
    }
    let firstTraitValue

    for (const [, v] of Object.entries(answerObject.traits)) {
      firstTraitValue = v[0].value
      break
    }

    shrekAnswer = firstTraitValue ? firstTraitValue : wrongQuestionAnswer
  }
  console.log(`Answered with: ${shrekAnswer}`)
  
  return {
    reply: [
      {
        payload: shrekAnswer
      }
    ]
  }
}
