
enum EVENT_TYPE {
  EVENTS_API = "events_api",
  CONNECTED = "hello"
}

export default async function ({payload}) {
  const eventType: EVENT_TYPE = payload.type
  
  switch(eventType){
    case EVENT_TYPE.CONNECTED:
      console.log(`connection established..`)
      break
    case EVENT_TYPE.EVENTS_API:
      if(payload.payload.event.type === "reaction_added"){
        console.log(`user ${payload.payload.event.item_user} reacted with ${payload.payload.event.reaction}`)
      }
      break
  }
}
