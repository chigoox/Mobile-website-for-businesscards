import { db, storage, auth } from '../config/Firebase';
import {getDoc, doc, setDoc } from "firebase/firestore";
import { AiOutlineCheck, AiOutlineClose, AiOutlineLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { commerce } from "../config/CommerceJs";
import {Link} from 'react-router-dom';
import ItemPage from '../Componets/ShopComponets/ItemPage';
import CartPage from '../Componets/ShopComponets/CartPage';
import HeaderOther from '../Componets/HeaderOther';






export default function ShopPage() {
    const [products, setProducts] = useState()
    const [shopItems, setShopItems] = useState()
    const [showItemPage, setShowItemPage] = useState([false,[]])
    const [showCart, setShowCart] = useState(false)
    const [userData, setUserData] = useState({})
    const [currentCart, setCurrentCart] = useState()
    const uid = auth.currentUser?.uid
    

    const [cartTotalItems,setCartTotalItems] = useState()
    async function docExist(userID){
        const docRef = doc(db, "users", userID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        
        if (Object.keys(userData).length == 0){
            
            setUserData(docSnap.data())  
            userData? cart(userData.Cart) : cart()   
        }
        } else {
        setFetchRequest("No Profile Found")
        if (Object.keys(userData).length != 0){
            
            setUserData({})

        }
        }
    }
  

    function ShopItem (props){
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




    

    

    function cart(id){
        id? commerce.cart.retrieve(id).then((cart) => {setCurrentCart(cart)}) : commerce.cart.retrieve().then((cart) => {setCurrentCart(cart)})
    }
    async function addCartToDatabase(){
        if (currentCart?.id){
            const docRef = doc(db, "users", uid)
            const data = currentCart.id?  {Cart:currentCart.id} : {Cart:'loading cart'} 
            await setDoc(docRef, data, { merge: true });
        }
    }

    function openCloseItemView(arr){
        if (showItemPage[0]){
            setShowItemPage([false,[]])
        }else{
            setShowItemPage(arr)
        }
    }

    function showCartToggle(){
        if(showCart){
            setShowCart(false)
        }else{
            setShowItemPage([false,[]])
            if (cartTotalItems > 0)   setShowCart(true) 
        }
       }

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        setProducts(data)
        setitems(data)
    }
    
    function setitems(products){
        //products.forEach(products => console.log(products.id) ) 
        setShopItems(
        products?.map(item =>{
            return <ShopItem
                prodID={item.id}
                key={item.sku} 
                name={item.name} 
                price={item.price.raw} 
                img={item.image?.url}
                alt={item.name}
                description={item.description}
                outOfStock ={item.inventory.available}
                /> 
           }))
    }
    
    
    
    useEffect(()=>{

        if(uid) docExist(uid)
        

        if (!products){
            fetchProducts()
        }
    }, [])


    if (userData && !userData.Cart) addCartToDatabase()
    if (currentCart?.total_items != cartTotalItems) setCartTotalItems(currentCart.total_items)
    userData?  cart(userData.Cart) : cart()
    useEffect(()=>{},[cartTotalItems])
    
   // if(currentCart) console.log(currentCart)
   

  return (
    <div className=' relative overflow-hidden p-4 h-[109vh] bg-white bottom-36'>
        {<HeaderOther  show={showCartToggle} cartTotalItems={cartTotalItems}/>}
        <h1 className='mt-16 font-bold text-5xl text-slate-800'>Cards</h1>
        <h2 className=' font-medium text-4xl'>Collections</h2>
        {showItemPage[0] && 
            <ItemPage 
                key={showItemPage[1][4]}
                name={showItemPage[1][0]}
                price={showItemPage[1][3]}
                img={showItemPage[1][1]}
                alt={showItemPage[1][2]}
                description={showItemPage[1][5]}
                outOfStock={showItemPage[1][6]}
                prodID={showItemPage[1][7]}
                close={openCloseItemView}
            />}
            {(showCart && cartTotalItems > 0 ) && <CartPage cartLink={currentCart?.hosted_checkout_url} cartTotalItems={cartTotalItems} cartTotalPrice={currentCart?.subtotal.formatted_with_symbol}/>}
        <div className="Shop-Section h-3/4">
            {shopItems}
        </div>
    </div>
  )
}
