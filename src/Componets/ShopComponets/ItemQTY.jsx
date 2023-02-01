import React from 'react'

export default function ItemQTY(props) {
  return (
    <>
        <button onClick={props.handleQty} id={'-button'} className="rounded-full h-6 w-6 bg-orange-500 text-white font-bold text-center">-</button>
            <input onChange={props.handleQty} id={'qt'} defaultValue={props.qty} type={'number'}  className="border-2 mx-1 text-center h-6 w-12 rounded-full"/>
        <button onClick={props.handleQty} id={'+button'} className="rounded-full h-6 w-6 bg-orange-500 text-white font-bold text-center">+</button>
    </>
  )
}
