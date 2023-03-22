import React from 'react'
import { useState } from 'react'
import { db, storage } from '../../config/Firebase';
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import AddLink from './AddLnk';
import { ref, getDownloadURL, uploadBytesResumable  } from "firebase/storage";
import { useEffect } from 'react';

function AddLinkPage(props) { 
  const userID = useParams().id
  const name = userID +'_Link_'+ Date.now()
  const userData = doc(db, "users", userID);
  const [showLinkAdd, setShowLinkAdd] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const [removeLink, setRemovedLink] = useState(false)
  const [uploading, setUploading] = useState([false,[]])
  const [data, setData] = useState()
  const toggleAddlink = () => {setShowLinkAdd(!showLinkAdd)}  
  
  const toggleuploading = () => {setUploading((old) =>{
    return(
      [!old[0],[...old[1]]]
    )
  })}
  
  async function fetchData(userID){
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       setData(docSnap.data())
     
    }
  }
  
  
  function uploadfile(key){  
    toggleuploading()
    const imagesRef = ref(storage, 'link_images/'+ name); // make ref to your firebase storage and select images folder
    const pic = document.getElementById("upload").files[0]
    
    const metadata = {
     
     contentType: pic.type,
   };
    uploadBytesResumable(imagesRef,pic, metadata).on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      
      
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
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
        setLinkValue((prev) => {
          return {...prev,[key]: downloadURL}
       })
       toggleuploading()
       
      });
    }
  );
  
};
  
  const inputChange = (event) => {
   if (event.target.name == "img"){
    uploadfile(event.target.name)
   }else {
     setLinkValue((prev) => {
       return {...prev,[event.target.name ]:event.target.value}
    })
   }

  }
   

  async function addLinkToDataBase(link){
    if(input) input.disabled = true;
    await updateDoc(userData, {
      Llinks: arrayUnion(link)
    })
    input.disabled = false;
    toggleAddlink()
  } 

  async function removeLinkFromDataBase(link){
    setRemovedLink(!removeLink)
    await updateDoc(userData, {
      Llinks: arrayRemove(link)
    });

  }
  function rand(min = 0, max) {
    if (!max) {max = min; min = 0}
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
  
  const linksMap = data?.Llinks.map((item) =>{
    return(
        <button onClick={()=>{removeLinkFromDataBase(item)}} className='h-16 w-full rounded-md my-2' key={item.title + rand(99999)}>
            <div  className=' relative bg-slate-900 h-full rounded-md  border-4 border-slate-700 border-opacity-90 bg-no-repeat bg-cover bg-[center_top_-7rem]' style={{backgroundImage: `url(${item.img})`}}>
              <div className='hover:opacity-100 opacity-0 absolute h-full w-full top-0 right-0 bg-'>
                <h1 className='relative bottom-3 h-full text-7xl text-rose-700 z-30'>x</h1>
                <div className='w-full h-full border-2 border-rose-700 absolute top-0 opacity-90 bg-slate-900'></div>
              </div>
              <h1 className='font-bold text-2xl '>{item.title}</h1>
          </div>
        </button>
    )
  })
  
  useEffect(()=>{fetchData(userID)},[showLinkAdd, removeLink])
  


  return (
    <div className='z-20 fixed h-[100%]   w-[100%]  top-0 lg:pt-[5%] pt-[20%]'>
        {uploading[0] &&  <div className='fixed z-30 top-0 left-0  h-full w-full'>
          <div className='relative z-40 bg-blue-500 top-[40%]'>
          <h1 className='text-center blur-0 text-2xl font-bold'> Uploading</h1>
          </div>
        </div>}
        <div className='relative rounded-xl text-center p-4 lg:w-[30%] md:w-[50%] w-[90%] h-[570px] text-slate-100 bg-slate-900 m-auto shadow-black shadow'>
            {showLinkAdd && <AddLink key={'addlink'} inputChange={inputChange} toggleAddlink={toggleAddlink} linkValue={linkValue} add={()=>{addLinkToDataBase(linkValue)}}/>}
            <h1 className="mb-5 font-bold text-3xl ">Manage Links</h1>
            <p className='font-semibold'>Add or remove links</p>
            <div className='h-[60%] border-y-2 overflow-y-scroll scrollbar-hide border-slate-500'>
              {linksMap}
            </div>
            <div className="flex justify-around h-40 py-10">
                <button onClick={toggleAddlink} className='font-bold border-2 m-2 h-12 w-36 shadow-sm shadow-black'>Add Link</button>
                <button onClick={props.toggleLinkPage} className='font-bold border-2 m-2 h-12 w-36 shadow-sm shadow-black'>Close</button>
            </div>
        </div>

    </div>
  )
}

export default AddLinkPage