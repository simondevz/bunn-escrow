import React from 'react'

export default function Footer() {
  return (
    <footer className='text-white bg-customColors-accent py-10 px-4 lg:px-28 flex justify-between mt-5'>
      <h1 className='md:text-lg font-medium'>The Escrow Manager</h1>
      <p>© { new Date().getFullYear()} The Escrow Manager, Inc</p>
    </footer>
  )
}
