import { GleeFunctionReturn } from '@asyncapi/glee'
import allFlights from '../Events/allFlights.js'
import updateFlight from '../Events/updateFlight.js'
export default async function (gleeEvent): Promise<GleeFunctionReturn> {
  const myEvent = gleeEvent.payload
  if (myEvent.name === 'allFlights') return await allFlights(myEvent.airportCode)
  if (myEvent.name === 'updateFlight') return await updateFlight(myEvent.updatedFlight)
}
