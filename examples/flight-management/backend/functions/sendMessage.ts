import allFlights from '../Events/allFlights.js';
import { GleeFunctionEvent } from '@asyncapi/glee';
import updateFlight from '../Events/updateFlight.js';
export default async function (gleeEvent: GleeFunctionEvent) {
  const response = {};
  const myEvent = gleeEvent.payload;
  if (myEvent.name === 'allFlights') {
    response['name'] = 'allFlights';
    response['flights'] = await allFlights(myEvent.airportCode);
  } else if (myEvent.name === 'updateFlight') {
    response['name'] = 'updateFlight';
    response['status'] = await updateFlight(myEvent.updatedFlight);
    response['flight'] = response['status'] && myEvent.updatedFlight;
  }
  return {
    send: [
      {
        payload: response,
      },
    ],
  };
}
