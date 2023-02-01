import React from 'react'
import { AiFillCloseCircle } from "react-icons/ai";

export default function LoginError(props) {
  return (
    
    <div className="absolute z-40 left-0 top-0 h-full">
 
          <div className='top-[20%]   relative h-[40vh]'>
            <div className='relative shadow-md rounded-md bg-slate-900 text-rose-900 h-full w-[80%] p-2 m-auto'>
            <button onClick={props.clicked} className='text-gray-600 text-4xl hover:text-rose-900'><AiFillCloseCircle /></button>
              <h1 className='font-bold text-5xl text-center'>Error</h1>
              <h1 className='mt-10 font-semibold text-1xl text-center'>{props.error}</h1>
            </div>
          </div>
  

    </div>
  )
}
