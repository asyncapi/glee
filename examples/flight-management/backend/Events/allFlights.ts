import DatabaseManager from '../helpters/DatabaseManager.js'
import type {GleeFunctionReturn} from '@asyncapi/glee/src/lib'

export default async function getFlights(airportCode: string): Promise<GleeFunctionReturn> {
  const flights = await DatabaseManager.getInstance().getFlights(airportCode)
  return {
    reply: [{
      payload: JSON.stringify({      
        name: 'allFlights',
        flights: flights,})
    }]
  }
}
