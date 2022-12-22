import 'cross-fetch/dist/node-polyfill.js'
import DatabaseManager from '../helpters/DatabaseManager.js'

export default async function getFlights(airportCode: string) {
  return DatabaseManager.getInstance().getFlights(airportCode)
}
