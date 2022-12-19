'use client';
import React, { useState } from 'react';

export default function Flight({ _flight, sendJsonMessage }: any) {
  const [flight, setFlight] = useState(_flight);

  const {
    flight_no,
    arrival,
    departure,
    destin_terminal,
    origin_terminal,
    origin_city,
    destin_city,
    status,
  } = flight;

  const arrivalDate = new Date(arrival);
  let statusClass = 'text-white';
  switch (status) {
    case 'ON TIME':
      statusClass = 'text-green-500';
      break;
    case 'DELAYED':
      statusClass = 'text-yellow-500';
      break;
    case 'CANCELED':
      statusClass = 'text-red-500';
      break;
  }
  const updateField = (event: any, field: string) => {
    const updatedFlight = {
      ...flight,
      [field]: event.target.value,
    };
    console.log('flight updated.');
    setFlight(updatedFlight);
  };
  const publishData = () => {
    sendJsonMessage({ name: 'updateFlight', updatedFlight: flight });
  };
  return (
    <>
      <td className='text-yellow-500'>{flight_no}</td>
      <td>
        <input
          type='datetime-local'
          value={getDateString(departure)}
          onChange={(e) => updateField(e, 'departure')}
        />
      </td>
      <td>
        <input
          type='datetime-local'
          value={getDateString(arrival)}
          onChange={(e) => updateField(e, 'arrival')}
        />
      </td>
      <td className=' text-yellow-400'>{origin_city}</td>
      <td className=' text-yellow-400'>{destin_city}</td>
      <td>
        <select value={status} onInput={(e) => updateField(e, 'status')}>
          <option>ON TIME</option>
          <option>DELAYED</option>
          <option>CANCELED</option>
        </select>
      </td>
      <td>
        <input
          value={origin_terminal}
          onInput={(e) => updateField(e, 'origin_terminal')}
        />
      </td>
      <td>
        <input
          value={destin_terminal}
          onInput={(e) => updateField(e, 'destin_terminal')}
        />
      </td>
      <td>
        <button onClick={publishData} className='bg-accent px-2'>
          Submit
        </button>
      </td>
    </>
  );
}

const getDateString = (date: string) => {
  const d = new Date(date);
  var departureDateString =
    d.getFullYear() +
    '-' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + d.getDate()).slice(-2) +
    'T' +
    ('0' + d.getHours()).slice(-2) +
    ':' +
    ('0' + d.getMinutes()).slice(-2);

  return departureDateString;
};
