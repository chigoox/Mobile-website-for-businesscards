import React from 'react'



   export default function InputField(props) {
    return(
        <label className={`m-1 text-xs text-gray-400 after:translate-x-7 after:-translate-y-[3.9rem] ${props.title} after:inline-block`}>
            <input name={props.name} key={props.name} onChange={props.changed}  className={`bg-transparent focus:text-white focus:border-white focus:outline-0 text-lg text p-5 border-4 border-slate-400 rounded-full h-16 w-full`} defaultValue={props.placeholder}  type={props.type}></input>
        </label>
    )
}


