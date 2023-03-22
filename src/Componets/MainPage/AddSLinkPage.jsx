import React, {useState} from 'react'
import InputField from '../FormInput'
import { useParams } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect } from 'react';





   
function AddSLinkPage(props) {
    const [links, setlinks] = useState()
    const [sLinks, setSlinks] = useState()
    const [data, setData] = useState()
    const slinks =  data?.Slinks
    const uid = useParams().id
     async function fetchData(userID){
       const docRef = doc(db, "users", userID);
       const docSnap = await getDoc(docRef);
   
       if (docSnap.exists()) {
          setData(docSnap.data())
        
       }
     }

    function handleChangeInput(event){   
        const value = event.target.value
        setlinks((old) =>{ 
          
          return  (
            {...old,[event.target.name]: (value == "") ? null : value.includes('https://') ? value : 'https://' + value }
            )

        })
    
    }

    useEffect(()=>{fetchData(uid)},[])   
    useEffect(()=>{

        setSlinks(
          {Slinks:links}// : {Slinks:null}
            )
    },[links])
    
    
    
        async function submitForm(){
        const docRef = doc(db, "users", uid) 
        const data = sLinks
        try{await setDoc(docRef, data, { merge: true })}catch{(error) => {console.log(error)}}
        props.toggleSLinkPage()
        }

    
  return (
    <div className='z-20 fixed h-[100%]   w-[100%]  top-0 lg:pt-[5%] pt-[20%]'>
    <div className='relative rounded-xl text-center p-4 lg:w-[30%] md:w-[50%] w-[90%] h-[670px] text-slate-100 bg-slate-900 m-auto shadow-black shadow'>
        <h1 className="mb-5 font-bold text-3xl ">Manage Social</h1>
        <p className='font-semibold'>Add or remove links</p>
        <div className='h-[60%] border-y-2  border-slate-500'>
        <div className='p-4'>
                <InputField placeholder={slinks?.Slink1} name={'Slink1'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
                <InputField placeholder={slinks?.Slink2} name={'Slink2'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
                <InputField placeholder={slinks?.Slink3} name={'Slink3'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
                <InputField placeholder={slinks?.Slink4} name={'Slink4'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
            </div>
        </div>
        <div className="flex justify-around h-40 py-10">
            <button onClick={submitForm} className='font-bold border-2 m-2 h-12 w-36 shadow-sm shadow-black'>Done</button>
        </div>
    </div>

</div>
  )
}

export default AddSLinkPage