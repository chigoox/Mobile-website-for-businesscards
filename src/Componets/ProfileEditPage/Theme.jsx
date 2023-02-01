import React from 'react'
import { useState } from 'react'
import { AiOutlineCamera, AiOutlineLeft } from "react-icons/ai";
import { storage } from '../../config/Firebase'
import { ref, getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Theme(props) {
    const uid = useParams().id
    const name = uid
    const themes = props.theme? props.theme : ''
    const [currentThemes,setCurrentThemes] = useState(props.themes)
    const [showCoverIMG, setShowCoverIMG] = useState(props.themes.CoverIMG? true:false)
    const [avatarURL, setAvatarURL] = useState('')
    const [newURL, setNewURL] = useState('')
    const [uploading, setUploading] = useState([false])
    
    const toggleuploading = (init) => {setUploading((old) =>{

        return(
            (init === true)  ?  [false]:[!old[0],old[1]]
        )
      })}

      const setUploadPer = (progress) => {setUploading((old) =>{
        return(
          [old[0],progress]
        )
      })}
    
    
    const toggleShowCoverIMG = () =>{setShowCoverIMG(!showCoverIMG)}

    function uploadfile(key){   
        const imagesRef = ref(storage, 'CoverImages/'+ name); // make ref to your firebase storage and select images folder
        const pic = document.getElementById("upload").files[0]
        
        const metadata = {
            
            contentType: pic.type,
        };
        uploadBytesResumable(imagesRef,pic, metadata).on('state_changed', 
        (snapshot) => {
            toggleuploading()
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadPer(progress)
            switch (snapshot.state) {
            case 'paused':
                setUploadPer('Upload is paused');
                break;
            case 'running':
                setUploadPer('Upload is running');
                break;
                }
                
            }, 
            (error) => {
                console.log(error)
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(ref(storage, imagesRef)).then((downloadURL) => {
            
                setAvatarURL(downloadURL)
                DataSetter(key, downloadURL)
                    
                console.log('data set ' + downloadURL)
                toggleuploading(true)
               

            });
        }
        );
        
    };

     function DataSetter(key, value){
           setCurrentThemes((data) => {
              return data = {...data, [key] : value}
           } )
       }


    function handleColorChange({ target }){
        if (target.name == 'CoverIMG'){
            uploadfile(target.name)
        }else{
            setCurrentThemes(oldValue => {
                return {...oldValue, [target.name]:target.value}
               
            })
        }
    }

    const handleSubmit = () => {
        props.setThemes(currentThemes)
        props.toggleTheme()
    }
    function openUpload() {
        document.getElementById('upload').click();
        
      }

      useEffect(()=>{
        if (showCoverIMG == false) {
            
            setCurrentThemes(oldValue => {
                return {...oldValue, CoverIMG:null}
            })
        }
      },[showCoverIMG])
  return (
    <div className='fixed z-40 left-0 top-0 lg:h-[99.5%] h-[89.5%] w-[100vw]'>
        {uploading[0] &&  
            <div className='fixed z-30 top-0 left-0  h-full w-full'>
              <div className='relative z-40 bg-blue-500 top-[40%]'>
                <h1 className='text-center blur-0 text-2xl font-bold'> Uploading: {uploading[1]}</h1>
              </div>
            </div>}
        <div className='bg-slate-900 h-[57rem] m-auto relative p-2 py-3 rounded-xl w-96 top-0 shadow-md shadow-black over-y-scroll'>
            <h1 className='text-white font-bold text-4xl text-center'>Theme</h1>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Cover Image</p>
               {showCoverIMG && <div className='img-div-cont bg-transparent shadow-md shadow-black border-2 h-7 w-[3.4rem] rounded overflow-hidden relative'>
                    <img className="object-cover h-full w-full text-center" src={avatarURL? avatarURL:props.themes?.CoverIMG} alt={''}/> 
                    <button id="upbutton" onClick={openUpload} className='absolute top-[0%] p-1 text-2xl text-center shadow-sm shadow-black  h-full w-full text-black'></button>
                    <input id={'upload'} accept="image/png, image/jpeg" name='CoverIMG' type="file" hidden></input>
                </div>}
                <button  onClick={toggleShowCoverIMG} className={`flex bg-slate-900 text-xl text-center shadow-sm shadow-black  h-7 w-[3.4rem]`}>
                    <div className={`flex-grow h-full ${!showCoverIMG? 'bg-red-300': 'bg-none'}`}>

                    </div>
                    <div className={`flex-grow h-full ${showCoverIMG? 'bg-green-300': 'bg-none'}`}>

                    </div>
                </button>

            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Profile Color</p>
                <input defaultValue={props.themes?.ProfileColor} name='ProfileColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>BackGround Color</p>
                <input defaultValue={props.themes?.BGColor} name='BGColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Header Text Color</p>
                <input defaultValue={props.themes?.TextColor} name='TextColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Header Sub text Color</p>
                <input defaultValue={props.themes?.SubTextColor} name='SubTextColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Text Color</p>
                <input defaultValue={props.themes?.BodyTextColor} name='BodyTextColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Sub text Color</p>
                <input defaultValue={props.themes?.BodySubTextColor} name='BodySubTextColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Button Color</p>
                <input defaultValue={props.themes?.ButtonColor} name='ButtonColor' type="color"></input>
            </div>
            <div className='flex justify-between p-4 text-white font-bold' onChange={handleColorChange}>
                <p>Accent Color</p>
                <input defaultValue={props.themes?.AccentColor} name='AccentColor' type="color"></input>
            </div>
            <div className='flex text-white font-bold p-5'>
            <button onClick={handleSubmit} className='m-auto h-16 w-40 bg-slate-900 hover:bg-slate-800 rounded-full border-2 shadow-md shadow-black'>Submit</button>
               <button onClick={()=>{props.toggleTheme()}} className='m-auto h-16 w-40 bg-slate-900 hover:bg-slate-800 rounded-full border-2 shadow-md shadow-black'>Cancel</button>
            </div>
            
        </div>
    </div>
  )
}

export default Theme