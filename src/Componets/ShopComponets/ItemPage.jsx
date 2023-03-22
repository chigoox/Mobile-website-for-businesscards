import { AiOutlineClose } from "react-icons/ai";
import { commerce } from "../../config/CommerceJs";
import { useEffect, useState } from "react";
import ItemQTY from "./ItemQTY";


export default function ItemPage (props){ //whenclciked
    const description = props.description.replace(/<\/?[^>]+(>|$)/g, "")
    const [amount, setAmount] = useState(0)
    const qty = document.querySelector('#qt')
    

    function addToCart(prodID, qt, variant){
        commerce.cart.add(prodID, qt, variant ? variant:null).then((response) => {});
    }

    const handleQty = (event) => {
      if( event.target.id == '-button'){
        setAmount(amount - 1)
    }else if (event.target.id == '+button'){
        setAmount(amount + 1)
      }else{
        setAmount(Number(event.target.value))
      }
      
    }
    useEffect(()=>{
        if (amount < 0) setAmount(0)
        if (amount > 10) setAmount(10)
        if (qty) qty.value = amount
        
    },[amount])
    return(
    <div className=" border-2 border-black text-center p-4 absolute top-8 left-0 h-full w-[100%] my-6 bg-white z-10 shadow shadow-white overflow-hidden">
        <button onClick={props.close} className='p-2 text-2xl relative h-10 w-10 left-[0%]'><AiOutlineClose /></button>
        <div className="w-full h-1/2">
            <img className="h-full w-full object-contain" src={props.img} alt="" />
        </div>
        <div className="h-1/2 w-full text-left">
                <h1  className="text-leftrelative font-bold text-4xl text-slate-700">{props.name}</h1>
                <div className="bg-gray-200 h-1 my-4"></div>
                <h3  className="relative font-semibold text-xl text-slate-400">{"$" + props.price}</h3>
                <p  className="relative text-slate-400">{description}</p>
                <div className="bg-gray-200 h-1 my-4"></div>
                <h1 className="text-center">Qty</h1>
                <div className="flex h-8 justify-center">
                    <ItemQTY handleQty={handleQty}/>
                </div>
                <h1 className="text-center">Stock:</h1>
                <button onClick={()=>{addToCart(props.prodID,amount)}} className="m-8 h-12 w-3/4 rounded-lg bg-orange-400">
                    <h3>Add to cart</h3>
                </button>          
            </div>
    </div>
  )
}