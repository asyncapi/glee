import axios from 'axios';
import Flights from '../../components/Flights';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';

export default async function HomePage({ params }: any) {

  const airportCode = params.airport_code;

  return (
    <div>
      <Flights
       airportCode={airportCode}
      />
    </div>
  );
}
