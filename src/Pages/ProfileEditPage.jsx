import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineCamera, AiOutlineLeft } from "react-icons/ai";
import { onAuthStateChanged } from "firebase/auth";
import { db, storage, auth } from '../config/Firebase';
import { getDoc, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import Buttons from '../Componets/Buttons'
import InputField from '../Componets/FormInput';
import Theme from '../Componets/ProfileEditPage/Theme';
import { getAuth, updateEmail } from "firebase/auth";




export default function ProfileEditPage() {
  const [editedData, setEditedData] = useState()
  const [avatarURL, setAvatarURL] = useState('')
  const [newURL, setNewURL] = useState('')
  const [showTheme, setShowTheme] = useState(false)
  const uid = useParams().id
  let name = uid //+ Date.now()
  const navigate = useNavigate()


  const [profile, setProfile] = useState({})
  const [userExist, setUserExist] = useState(false);
  const [themes, setThemes] = useState({})
  const cancelImg = () => { }
  const backButton = () => { navigate(`/${uid}/`) }
  const toggleTheme = () => { setShowTheme(!showTheme) }




  async function docExist(userID) {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);


    if (docSnap.exists()) {
      if (Object.keys(profile).length == 0) {
        setProfile(docSnap.data())
        setUserExist(true)
      }
    } else {
      if (Object.keys(profile).length != 0) {
        setProfile({})
        setUserExist(false)
      }
    }
  }



  function uploadfile(key) {
    const imagesRef = ref(storage, 'images/' + name); // make ref to your firebase storage and select images folder
    const pic = document.getElementById("upload").files[0]

    const metadata = {

      contentType: pic.type,
    };
    uploadBytesResumable(imagesRef, pic, metadata).on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

        document.getElementById('submit').setAttribute('disabled', 'true');
        document.getElementById('upbutton').setAttribute('disabled', 'true');
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

          setAvatarURL(downloadURL)
          DataSetter(key, downloadURL)

          console.log('data set ' + downloadURL)
          document.getElementById('submit').removeAttribute('disabled')
          document.getElementById('upbutton').removeAttribute('disabled')

        });
      }
    );

  };





  async function submitForm() {
    const docRef = doc(db, "users", uid)
    const data = editedData
    try {
      await setDoc(docRef, data, { merge: true })
      const auth = getAuth();
      updateEmail(auth.currentUser, data.Email).then(() => {
        // Email updated!
        // ...
      }).catch((error) => {
        // An error occurred
        console.log(error)
      });


    } catch { (error) => { backButton() } }
    backButton()
  }



  function DataSetter(key, value) {
    setEditedData((data) => {
      return data = { ...data, [key]: value }
    })
  }


  console.log(editedData)
  function handleChangeInputPP(event) {

    if (event.target.name == 'Avatar') {
      uploadfile(event.target.name)

    } else if (event.target.name.includes('Slink')) {
      DataSetter('Slinks', ({ ...editedData?.Slinks, [event.target.name]: event.target.value }))
    } else {
      DataSetter(event.target.name, event.target.value)
    }
  }



  function openUpload() {
    document.getElementById('upload').click();

  }

  // document.getElementById('upload').addEventListener()
  docExist(uid)
  const submitImg = () => {
    DataSetter('Avatar', avatarURL)
    console.log('newurl = avatar = ' + newURL == (avatarURL))
    console.log('show button ')

  }

  useEffect(() => { setNewURL(avatarURL) }, [avatarURL])
  useEffect(() => { DataSetter('Theme', themes) }, [themes])
  useEffect(() => { setThemes(profile.Theme) }, [profile?.Theme])


  return (
    <div className='absolute lg:w-full lg:px-96 top-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-900 transition-all  overflow-x-hidden text-white z-20'>
      {showTheme && <Theme toggleTheme={toggleTheme} themes={themes} setThemes={setThemes} />}
      <h1 className='font-bold text-center text-xl mt-4 text-white'>Profile Setting</h1>
      <div className='bottom-10 relative ml-4 w-[100%]'>
        <button onClick={backButton} className='text-xl relative h-10 w-10 left-[0%]'><AiOutlineLeft /></button>
      </div>

      <div className='profile-Pic-Container w-full mt-8'>
        <div className='img-div-cont mx-auto mb-8 bg-transparent shadow-md shadow-black h-32 w-32 rounded-full overflow-hidden relative'>
          <img className="object-cover h-full w-full text-center" src={newURL ? newURL : profile.Avatar} alt={'img'} />
          <button id="upbutton" onClick={openUpload} className='absolute top-[35%] right-[35%] bg-white bg-opacity-50 text-2xl p-2 text-center rounded-full shadow-sm shadow-black  h-10 w-10 text-black'><AiOutlineCamera /></button>
        </div>
        <input name={'Avatar'} id='upload' type='file' onChange={handleChangeInputPP} accept="image/png, image/jpeg" hidden />


      </div>
      <div className='flex'>
        <button onClick={toggleTheme} className='shadow-md shadow-black text-2xl text-white font-bold rounded-3xl bg-slate-900  p-4 w-40 relative m-auto'>Theme</button>
      </div>
      <div className='p-6 lg:p-20 Info-container'>
        <h1 className='mb-4 font-bold text-xl'>Your Infomation</h1>


        <InputField placeholder={profile.FirstName} name={'FirstName'} changed={handleChangeInputPP} type={'text'} title={"after:content-['First_Name:']"} />
        <InputField placeholder={profile.LastName} name={'LastName'} changed={handleChangeInputPP} type={'text'} title={"after:content-['Last_Name:']"} />
        <InputField placeholder={profile.Email} name={'Email'} changed={handleChangeInputPP} type={'email'} title={"after:content-['Email:']"} />
        <InputField placeholder={profile.Phone} name={'Phone'} changed={handleChangeInputPP} type={'tel'} title={"after:content-['phone:']"} />


        <h1 className='font-bold text-lg text-center'>Title:</h1>
        <textarea defaultValue={profile.Title} placeholder={profile.Title} name={'Title'} onChange={handleChangeInputPP} maxLength="45" className='focus:border-white outline-0 w-full border-gray-400 border-4 h-20 resize-none bg-transparent rounded-3xl p-2'></textarea>

        <h1 className='font-bold text-lg text-center'>About Me:</h1>
        <textarea wrap="hard" defaultValue={profile.About} placeholder={profile.About} name={'About'} onChange={handleChangeInputPP} maxLength="170" className='focus:border-white border-gray-400 outline-0 break-all w-full border-4 h-40 text-white p-2 rounded-3xl resize-none bg-transparent'></textarea>

        <div className='w-full text-center'>
          <Buttons clicked={submitForm} id={'submit'} size={2} text={"Submit"} ThinWhiteBorder={true} />
        </div>
      </div>


    </div>
  )
}







/*  <div className='m-2'>
     <h1 className='font-bold m-4 text-xl'>Social Links</h1>
     <InputField placeholder={profile.Slinks?.Slink1}  name={'Slink1'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
     <InputField placeholder={profile.Slinks?.Slink2}  name={'Slink2'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
     <InputField placeholder={profile.Slinks?.Slink3}  name={'Slink3'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
     <InputField placeholder={profile.Slinks?.Slink4}  name={'Slink4'} changed={handleChangeInput} type={'url'} title={"after:content-['Social_Link:'] "}/>
 </div> */