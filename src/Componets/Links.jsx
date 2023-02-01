import React from 'react'
import { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db } from '../config/Firebase';
import { useParams } from 'react-router-dom';
import { AiOutlinePlusSquare } from "react-icons/ai";

export default function Links(props) {
  const userid  = useParams().id
  const [data, setData] = useState()
  async function fetchData(userID){
      const docRef = doc(db, "users", userID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
          setData(docSnap.data())
        
      }
    }
    
    function rand(min = 0, max) {
      if (!max) {max = min; min = 0}
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); 
    }

  function Ilink(props){
    let realLink;
      if (props?.link?.includes('https://')  || props?.link?.includes('http://')){
        realLink = props.link
      }else{
        realLink = `https://${props.link}`
      }
    return(
        <a href={realLink} key={props.link + rand(99999)} className='m-2  h-32 w-20 bg-gray-200 rounded-lg lg:m-4 border-2 border-[color:var(--AccentColor)]'>
            <img className="object-cover rounded-md h-32 w-20 m-auto"src={props.img} alt="" />
            <h1 className='text-center text-sm font-semibold text-[color:var(--BodyTextColor)]'>{props.title}</h1>
        </a>
    )
  }



const linkList = data?.Llinks?.map((item) => {
  return(
    <Ilink 
    key={item.title + rand(99999)}
    link={item.link}
    title={item.title} 
    img={item.img}
    />
  )
})


useEffect(()=>{fetchData(userid)},[props.showAddLink])





 
  return (
    <div className=''>
      <div className='p-5 flex'>
          <h1 className='font-bold lg:text-center text-[color:var(--BodyTextColor)]'>Links</h1>
          {props.auth == userid &&  <button onClick={props.toggleLinkPage} className='mx-2 text-lg text-[color:var(--BodyTextColor)]'><AiOutlinePlusSquare /></button>}

      </div>
      <div className='h-60 grid grid-flow-col-dense center overflow-y-hidden overflow-x-scroll scrollbar-hide'>
        {linkList}
      </div>
</div>
  )
}






/* 
[
  <Ilink 
    key={1}
    link={prop.link1}
    title="My Website" 
    img="https://tse2.mm.bing.net/th?id=OIP.O7M5LHRnTcHQQygVg8tKIQHaE8&pid=Api&P=0"
    />,
    <Ilink 
    key={2}
    link={prop.link2} 
    title="info site" 
    img="https://tse1.mm.bing.net/th?id=OIP.3_8wXosfUrUuOkJ6M08elwHaEK&pid=Api&P=0"
    />,
    <Ilink 
    key={3}
    link={prop.link3}
    title="other Website" 
    img="https://tse3.mm.bing.net/th?id=OIP.KyuYNSYvT9c6TLoLSrnRngHaE7&pid=Api&P=0"
    />,
    <Ilink 
    key={4}
    link={prop.link4} 
    title="beyond Website" 
    img="https://tse2.mm.bing.net/th?id=OIP.AS3MrJDM5CVJapzHLjFRvQHaHa&pid=Api&P=0"
    />,
  
  
  
  ] */