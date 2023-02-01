import React from 'react'
import Buttons from './Buttons'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <header className=' relative h-16 w-full  bg-[color:var(--headerColor)]'>
        <h1  className="absolute z-10 p-3 text-2xl Text-white text-[color:var(--TextColor)]">VOID</h1>
          <div className='absolute z-10 right-0 p-3 text-right'>
          <Link to={'/shop'}><Buttons size={1} text={"Get Your Card"}/></Link>
          </div>
      </header>
  )
}
