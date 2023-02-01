import React from 'react'
import { AiOutlineCamera } from "react-icons/ai";



function AddLink(props) {

    const openUpload = () => {
        document.getElementById('upload').click();
      }



         
      
      return (
        <div className='p-8 rounded shadow shadow-black mx-5 top-[25%] left-0 w-[90%]  absolute lg:h-70 h-96 bg-blue-900 z-10'>
            <h3 className='font-bold text-xl mb-5 text-white'>Add Link</h3>
            <input  name={'img'} id='upload' type='file' onChange={props.inputChange} accept="image/png, image/jpeg" hidden/>
            <button id="upbutton" onClick={openUpload} className='bg-white text-2xl p-4 text-center rounded-full shadow-sm shadow-black relative h-14 w-14 bottom-2 text-slate-900 mb-2'><AiOutlineCamera /></button>
            <input  placeholder={'Title'} onChange={props.inputChange} className='text-black p-2 font-bold border-2 border-b-0 border-slate-500 w-[100%]' type="text" name="title" id="input" />
            <input placeholder={'Link'} onChange={props.inputChange} className='text-black p-2 font-bold border-2 border-slate-500 w-[100%]' type="url" name="link" id="input" />
            
            <div className="flex justify-around h-32 py-5">
                <button onClick={props.add} className='font-bold m-2 h-12 w-36 border-2 shadow-sm shadow-black '>Add</button>
                <button onClick={props.toggleAddlink} className='font-bold m-2 border-2 h-12 w-36 shadow-sm shadow-black'>Cancel</button>
            </div>
        </div>
  )
}

export default AddLink



