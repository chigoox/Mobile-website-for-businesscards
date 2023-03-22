import React from 'react'
import { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore";
import { db } from '../config/Firebase';
import { useParams } from 'react-router-dom';
import { AiOutlinePlusSquare } from "react-icons/ai";

import FB from '../assets/FB.png'
import IG from '../assets/IG.png'
import LI from '../assets/LI.png'
import TK from '../assets/TK.png'
import TW from '../assets/TW.png'
import APP from '../assets/APP.png'
import AWS from '../assets/AWS.png'
import DB from '../assets/DB.png'
import GH from '../assets/GH.png'
import GM from '../assets/GM.png'
import DEFAULT from '../assets/DEFAULT.png'
import PIN from '../assets/PIN.png'
import SC from '../assets/SC.png'
import SCH from '../assets/SCH.png'
import SP from '../assets/SP.png'
import TM from '../assets/TM.png'
import WAPP from '../assets/WAPP.png'
import YM from '../assets/YM.png'
import YT from '../assets/YT.png'







export default function Social(props) {

  function rand(min = 0, max) {
    if (!max) {max = min; min = 0}
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
  const userid  = useParams().id
  const [data, setData] = useState()
  async function fetchData(userID){
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setData(docSnap.data())
      
    }
  }
  
  useEffect(()=>{fetchData(userid)},[props.showAddSLink])
      
  function Icon(props){
      let realLink;
      if (props.link.includes('https://')  || props.link.includes('http://')){
        realLink = props.link
      }else{
        realLink = `https://${props.link}`
      }
    
      return(
          <a href={realLink} key={realLink + rand(99999)} className='flex justify-center p-3 h-20 w-20  bg-[color:var(--AccentColor)] rounded-lg m-4 my-0 lg:m-4'>
              <img className="p-1 h-10 m-2"src={props.icon} alt="" />
             
          </a>
      )
  }


if(props?.Slinks) {

    const iconSocial = (Object.values(data?.Slinks).map((item) => {
      if (item == null) return
      return(
    <Icon icon={item.includes('instagram')? IG : 
                item.includes('facebook')? FB :
                item.includes('tiktok')? TK:
                item.includes('linkedin')? LI:
                item.includes('twitter')? TW : 
                item.includes('youtube')? YT :
                item.includes('apple')? APP :
                item.includes('amazon')? AWS :
                item.includes('dropbox')? DB :
                item.includes('github')? GH :
                item.includes('gmail')? GM :
                item.includes('pintrest')? PIN :
                item.includes('soundcloud')? SC :
                item.includes('snapchat')? SCH :
                item.includes('spotify')? SP :
                item.includes('tumblr')? TM :
                item.includes('whatsapp')? WAPP :
                item.includes('yahoo')? YM : DEFAULT

              }      
          link={item} key={item + rand(99999)}/>)
  }))


  return (
    <div>
        <div className='flex p-5'>
            <h1 className='font-bold lg:text-center text-[color:var(--BodyTextColor)]'>Social Networks</h1>
            {props.auth == userid &&  <button onClick={props.toggleSLinkPage} className='mx-2 text-lg text-[color:var(--BodyTextColor)]'><AiOutlinePlusSquare /></button>}


        </div>
        <div className='flex justify-around lg:justify-center social h-fit'>
            {iconSocial}
        </div>
    </div>


    
  )
}
  
 
  

  
}