import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/Firebase';
import {useNavigate} from 'react-router-dom';
function Logout(props) {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
        // An error happened.
        });
    }  
    

  return (
    <div className='z-20 fixed h-[100%] w-[100%] border-4 border-gray-300 top-0 lg:pt-[10%] pt-[40%]'>
        <div className='rounded-xl text-center p-4 lg:w-[30%] w-[90%] h-[270px] text-white bg-slate-800 m-auto shadow-black shadow'>
            <h1 className="mb-5 font-bold text-3xl">Logout</h1>
            <p className='font-semibold'>Would you like to logout?</p>
            <div className="flex justify-around h-40 py-10">
                <button onClick={logout} className='font-bold m-2 h-12 w-36 shadow-sm shadow-black border-2 hover:bg-slate-700'>Logout</button>
                <button onClick={props.toggleLogOut} className='font-bold m-2 h-12 w-36 shadow-sm shadow-black border-2 hover:bg-slate-700'>Cancel</button>
            </div>
        </div>

    </div>
  )
}

export default Logout