'use client'
import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import Flight from './Flight'
import Header from './FlightsHeader'

export default function Flights({ airportCode }: any) {
  const {sendJsonMessage, lastMessage } = useWebSocket('ws://localhost:3000')
  const [flights, setFlights] = useState<any[]>([])

  useEffect(()=> sendJsonMessage({name: 'allFlights', airportCode}), [])

  useEffect(() => {
    if (lastMessage !== null) {
      const jsonMessage = JSON.parse(lastMessage.data)
      if(jsonMessage.name === 'allFlights'){
        setFlights(jsonMessage.flights)
      } else if(jsonMessage.name === 'updateFlight' && jsonMessage.status){
        setFlights(flights.map(flight=> {return flight.id===jsonMessage.flight.id ? jsonMessage.flight : flight}))
      }
    }
  }, [lastMessage, setFlights])



  const arrivals = flights
  .filter((flight) => {
    return flight.destin_code === airportCode
  })
  .map((flight) => {
    return {
      ...flight,
      arrival: '',
      destin_city: '',
      destin_terminal: '',
    }
  })

const departures = flights
  .filter((flight) => {
    return flight.origin_code === airportCode
  })
  .map((flight) => {
    return {
      ...flight,
      departure: '',
      origin_city: '',
      origin_terminal: '',
    }
  })

  return (
    <section className=' bg-slate-800 text-white'>
      <Header icon='/images/departure.svg' text='Departures' />
      <div className='flex flex-col divide-y-2 divide-solid font-mono'>
        {departures.map(createFlight)}
      </div>
      <Header icon='/images/arrival.svg' text='Arrivals' />
      <div className='flex flex-col divide-y-2 divide-solid font-mono'>
        {arrivals.map(createFlight)}
      </div>
    </section>
  )
}
const createFlight = (flight: any) => (
  <div key={flight.id}>
    <Flight info={flight} />
  </div>
)
