import React from 'react'
import { AiOutlineLeft, AiOutlineShoppingCart } from "react-icons/ai";
import {Link} from 'react-router-dom';


function HeaderOther(props) {
  return (
    <header className='fixed z-20 right-0 top-0 w-[100vw] '>
    <div className=' px-4 bg-slate-900 h-14 w-full flex justify-between'>
        <Link to={(-1)}> 
            <button className="h-14 p-4 text-white font-bold text-3xl w-12">
                <AiOutlineLeft />
            </button>    
        </Link>
        {!props.hideCart && 
        <div className="h-6 w-6 rounded-full bg-orange-500 absolute opacity-90 right-1 top-1 text-center text-lg text-white text-bolb">{props.cartTotalItems}</div>
        }
        {!props.hideCart &&         <button onClick={props.show}className='text-3xl text-white text-bolb'>
        <AiOutlineShoppingCart />
        </button>}

    </div>
</header>
  )
}

export default HeaderOther


//