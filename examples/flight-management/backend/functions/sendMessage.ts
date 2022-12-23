import allFlights from '../Events/allFlights.js'
import updateFlight from '../Events/updateFlight.js'
export default async function (gleeEvent) {
  const myEvent = gleeEvent.payload
  switch(myEvent.name){
    case 'allFlights': return await allFlights(myEvent.airportCode); break
    case 'updateFlight': return await updateFlight(myEvent.updatedFlight); break
  }
}
