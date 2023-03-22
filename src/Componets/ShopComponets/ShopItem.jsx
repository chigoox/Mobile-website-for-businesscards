import React from 'react'

export default function ShopItem (props){
    return(
    <button onClick={()=>{setShowItemPage([true,[props.name,props.img,props.alt,props.price,props.sku,props.description,props.outOfStock,props.prodID]])}} key={props.name} className="flex h-32 w-[95%] my-5 mx-auto rounded-xl shadow shadow-black overflow-hidden">
        <div className="w-[40%]">
            <img className="p-6 h-full w-full object-contain" src={props.img} alt={props.alt} />
        </div>
        <div className="relative p-2 m-1 w-[60%] top-[30%] right-8">
            <h3 className="relative font-bold text-lg text-slate-700">{props.name}</h3>
            <h3 className="relative font-semibold text-md text-slate-400">{"$" + props.price}</h3>
        </div>
    </button>
  )
}