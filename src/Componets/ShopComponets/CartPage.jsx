import { db, storage, auth } from '../../config/Firebase';
import {getDoc, doc, setDoc } from "firebase/firestore";
import { AiOutlineCheck, AiOutlineClose, AiOutlineLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { commerce } from '../../config/CommerceJs';



export default function CartPage(props) {
  const [cartItems, setCartItems] = useState()
  const getCartItems = commerce.cart.contents().then((response) => {setCartItems(response)})


  
  

   const showCartItems = cartItems?.map((item)=>{
     // const [amount,setAmount] = useState(item.quantity)
      
      function handleQty(event){
          if( event.target.id == '-button'){
            commerce.cart.add(item.product_id, -1, item.variant)
          }else if (event.target.id == '+button'){
        //   setAmount((a)=>{a+1})
            commerce.cart.add(item.product_id, 1, item.variant)
          }else{
            commerce.cart.update(item.id, { quantity: event.target.value }).then(response =>{});
          }
      }

      function handleClearItem(item){
        commerce.cart.remove(item).then((response) => console.log(response))
      }
        
        
        //qt not selected if i can select it i can assign the value
        
        //const qtyField = document.getElementById('qt')
        //if (qtyField?.value ) console.log(qtyField.value)// = item.quantity
        return(
          <div key={item.id} className="relative pb-2 m-1 h-36 w-36  shadow-sm shadow-black">
            <button onClick={()=>{handleClearItem(item.id)}} className='absolute right-0 p-1 text-lg text-bold'><AiOutlineClose/></button>
            <div className='overflow-hidden bg-black'>
              <img src={item.image.url} />
            </div>
            <div className="text-white text-sm absolute bottom-0 w-full pb-1 pt-2 bg-black rounded-t-3xl bg-opacity-60">
              <h1 className="font-bold">{item.name}</h1>
              <h3 className="font-semibold">{item.price.formatted_with_symbol}</h3>
              <div className='text-black'>
                  <button onClick={handleQty} id={'-button'} className="rounded-full h-6 w-6 bg-orange-500 text-white font-bold text-center">-</button>
                      <input onChange={handleQty} id={'qt'} defaultValue={item.quantity} type={'number'}  className="border-2 mx-1 text-center h-6 w-12 rounded-full"/>
                  <button onClick={handleQty} id={'+button'} className="rounded-full h-6 w-6 bg-orange-500 text-white font-bold text-center">+</button>
              </div> 
          </div>

  
            </div>
          
          )
        })
  
      
        
      
      
   
      return (
    <div className="border-2 border-black text-center p-4 absolute top-8 left-0 h-full w-[100%] my-6 bg-white z-10 overflow-hidden">
       <h1 className="font-bold text-3xl">Cart</h1>
       <button onClick={()=>{commerce.cart.empty().then((response) => console.log(response))  }} className="m-8 h-5 text-wh w-20 rounded-lg bg-orange-400 my-2">Clear Cart</button>
       <div className="p-4 grid grid-cols-2 shadow-black shadow grid-rows-2 justify-around  w-full h-[45%] border-gray-300">
        {showCartItems}
       </div>

       <div className='my-4 p-4 h-[30%]'>
        <div className=" h-1/2">
          <h1 className="text-semibold text-xl">Shipping</h1>
          <p>2-5 Bussiness days</p>
          <div className='text-black'>{'test'}</div>
          
        </div>
        <div className="h-1/2 m-1">
          <div className="flex justify-between px-4">
            <p className='text-lg'>Total</p>
            <p className='text-lg'>{props.cartTotalPrice}</p>
          </div>
          <a href={props.cartLink}>
            <button  className="m-8 h-12 w-3/4 rounded-lg bg-orange-400">
                <h3 className='font-bold'>Checkout</h3>
            </button>  
          </a>
        </div>
       </div>
    </div>
  )
}
