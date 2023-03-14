'use client'
import React, { useEffect, useState } from 'react'
import Flight from './Flight'
import Header from './FlightsHeader'
import useWebSocket from 'react-use-websocket'

export default function Flights({ _icon, _title, airportCode }: any) {
  const { sendJsonMessage, lastMessage } = useWebSocket('ws://localhost:3000')
  const [flights, setFlights] = useState([])

  useEffect(() => sendJsonMessage({ name: 'allFlights', airportCode }), [])

  useEffect(() => {
    if (lastMessage !== null) {
      const jsonMessage = JSON.parse(lastMessage.data)
      console.log(jsonMessage)
      if (jsonMessage.name === 'allFlights') {
        setFlights(jsonMessage.flights)
      }
    }
  }, [lastMessage, setFlights])

  return (
    <section className=" bg-slate-800 text-white font-mono ">
      <Header icon={_icon} text={_title} />
      <div className="px-2">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="">
              <th>Flight No</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Origin T.</th>
              <th>Destination T.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight: any) => {
              return (
                <tr key={flight.id} className="text-black">
                  <Flight _flight={flight} sendJsonMessage={sendJsonMessage} />
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
