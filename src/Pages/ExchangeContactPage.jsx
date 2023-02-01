import { db, storage, auth } from '../config/Firebase';
import {getDoc, doc, setDoc } from "firebase/firestore";
import React, {useState, useEffect } from 'react'
import Buttons from '../Componets/Buttons';
import InputField from '../Componets/FormInput';
import HeaderOther from '../Componets/HeaderOther';
import { AiOutlineCamera, AiOutlineCheck, AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useParams } from 'react-router-dom';


function ExchangeContactPage(props) {
  const [Data, setData] = useState({
    FirstName: "",
    LastName: "",
    Phone: "",
    Email: "",
    Instagram: "",
    Twitter: "",
    Facebook: "",
    TikTok: "",
    Youtube: "",
    Notes: " "
})
  const uid = useParams().id

  

  
  
  function DataSetter(key, value){
        setData((data) => {
            return data = {...data, [key] : value}
        } )
    }

    async function submitForm(){
      const docRef = doc(db, "users", uid) 
      const data = {SavedContacts:{
        [`${Data.FirstName}${Data.LastName}`] : Data
      }}
      await setDoc(docRef, data, { merge: true });
      window.location.href = ("javascript:history.go(-1)")
      }
   
  function handleChangeInput(event){
    if (event.target.name == 'Avatar') {

      uploadfile(event.target.name)
      console.log('changed')//
      
    }else{
      
      DataSetter(event.target.name, event.target.value)
    
    }
    
  }


  console.log(Data)
  //<label className={'m-2'}>First Name: </label>
  //<input type={'text'} className={'border-2 h-10 font-semibold m-2 text-2xl border-gray-900 w-[90%] shadow-black shadow-sm'}/>
  
  return (
    <div className="z-30  w-[100%] mx-0 rounded-2xl border-2 top-16 left-0 absolute bg-white">
        <HeaderOther  hideCart={true}/>
        <div className='p-2'>
            <div className='flex justify-between'>
              <h1 className="font-bold text-3xl m-2">Your Info</h1>
              <button className='text-3xl h-12 w-12 p-2'><AiOutlineCamera /></button>
            </div>
            <InputField placeholder={''}     name={'FirstName'}   changed={handleChangeInput}  type={'text'}   title={"after:content-['First_Name:']"}/>
            <InputField placeholder={''}     name={'LastName'}   changed={handleChangeInput}  type={'text'}   title={"after:content-['Last_Name:']"}/>
            <InputField placeholder={''}     name={'Phone'}       changed={handleChangeInput}  type={'tel'}   title={"after:content-['Phone:']"}/>
            <InputField placeholder={''}     name={'Email'}       changed={handleChangeInput}  type={'email'}   title={"after:content-['Email:']"}/>
            <InputField placeholder={''}     name={'Instagram'}   changed={handleChangeInput}  type={'text'}   title={"after:content-['Instagram']"}/>
            <InputField placeholder={''}     name={'Twitter'}     changed={handleChangeInput}  type={'text'}   title={"after:content-['Twitter:']"}/>
            <InputField placeholder={''}     name={'Facebook'}    changed={handleChangeInput}  type={'text'}   title={"after:content-['Facebook:']"}/>
            <InputField placeholder={''}     name={'TikTok'}      changed={handleChangeInput}  type={'text'}   title={"after:content-['TikTok:']"}/>
            <InputField placeholder={''}     name={'Youtube'}     changed={handleChangeInput}  type={'text'}   title={"after:content-['Youtube:']"}/>
            <label className={'m-2'}>Notes: </label>      
            <textarea name={'Notes'} onChange={handleChangeInput} className={'border-2 h-32 m-4 text-xl p-2 border-gray-500 w-[90%] shadow-black shadow-sm'}> </textarea><textarea />      
            <div className='w=full  text-center'><Buttons size={2} text={"Share Contact"} clicked={submitForm}/></div>
               


        </div>
    
    </div>
  )
}

export default ExchangeContactPage