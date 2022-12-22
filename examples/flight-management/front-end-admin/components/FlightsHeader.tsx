import React from 'react'
import Image from 'next/image'

interface props {
  icon: string;
  text: string;
}
export default function FlightsHeader({ icon, text }: props) {
  return (
    <header className='flex items-center w-full h-[80px] bg-yellow-300 text-black border-4 border-slate-800 px-2'>
      <div className='flex items-center gap-2'>
        <Image
          className=' bg-black rounded-full p-1'
          src={icon}
          width={50}
          height={50}
          alt='departure icon'
        />
        <h1 className=' text-4xl'>{text}</h1>
      </div>
    </header>
  )
}
