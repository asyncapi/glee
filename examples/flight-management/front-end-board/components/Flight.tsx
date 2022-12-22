import React from 'react'

export default function Flight({ info }: any) {
  const {
    flight_no,
    arrival,
    departure,
    destin_terminal,
    origin_terminal,
    origin_city,
    destin_city,
    status,
  } = info

  let statusClass = 'text-white'
  switch (status) {
    case 'ON TIME':
      statusClass = 'text-green-500'
      break
    case 'DELAYED':
      statusClass = 'text-yellow-500'
      break
    case 'CANCELED':
      statusClass = 'text-red-500'
      break
  }
  return (
    <div className='flex justify-between gap-3 px-2'>
      <p className=' min-w-[72px]'>{flight_no}</p>
      <p>{new Date(arrival || departure).toTimeString().substring(0, 5)}</p>
      <p className=' text-yellow-400 mr-auto'>
        {origin_city || destin_city}
      </p>
      <p className={`min-w-[92px] ${statusClass}`}>{status}</p>
      <p className='text-yellow-400 min-w-[36px]'>
        {destin_terminal || origin_terminal}
      </p>
    </div>
  )
}
