import type { GleeFunctionReturn } from '@asyncapi/glee'
import DatabaseManager from '../helpters/DatabaseManager.js'
export default async function updateFlight(flight):Promise<GleeFunctionReturn> {
  const isSuccessful = await DatabaseManager.getInstance().updateFlight(flight)
  if(isSuccessful){
    return {
      send: [{
        server: 'websockets',
        payload: JSON.stringify({
          name: 'updateFlight',
          flight,
      })
      }]
    }
  } else return {}
}
