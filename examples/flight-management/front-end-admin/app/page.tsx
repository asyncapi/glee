import React from 'react';
import '../styles/globals.css';
import Image from 'next/image';
import FlightsHeader from '../components/FlightsHeader';
import Flight from '../components/Flight';
export default function Main() {
  return (
    <div className='box-border'>
      <FlightsHeader icon='/flights.svg' text='Admin Dashboard' />
      <section className='bg-black w-full box-border'>
        <div className='w-screen'>
          <input
            type='text'
            className='box-border w-full h-12 p-2 border-4 border-black'
            placeholder='Search for Flight ID...'
          />
          <Flight />
          <Flight />
          <Flight />
          <Flight />
          <Flight />
          <Flight />
          <Flight />
        </div>
      </section>
    </div>
  );
}
