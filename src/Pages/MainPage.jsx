import React, {useState, useEffect } from 'react'
import {useParams, useNavigate, Link } from 'react-router-dom';
import Buttons from '../Componets/Buttons'
import Links from '../Componets/Links'
import Social from '../Componets/Social'
import Logout from '../Componets/MainPage/Logout';
import AddLinkPage from '../Componets/MainPage/AddLinkPage';
import AddSLinkPage from '../Componets/MainPage/AddSLinkPage';
import { db, auth } from '../config/Firebase';
import {getDoc, doc, setDoc } from "firebase/firestore";
import vCardFactory from 'vcards-js';
import { saveAs } from 'file-saver';
import pSBC from 'shade-blend-color';
import { AiFillEdit, AiOutlinePlusSquare } from "react-icons/ai";


// Get the root element






//t
export default function Main() {
  const UserPage  = useParams().id
  const navigate = useNavigate()
  const [profile, setProfile] = useState({})
  const [userExist,setUserExist] = useState(false);
  const [fetchRequest, setFetchRequest] = useState("Looking for profile")
  const [showLogOut, setShowLogOut] = useState(false)
  const [showAddLink,setShowAddLink] = useState(false)
  const [showAddSLink,setShowAddSLink] = useState(false)
  const bgColor =  profile.Theme?.BGColor  ? `bg-[${profile.Theme.BGColor}]`: `bg-slate-300`
  const editPageButton = () => {navigate(`profileEdit/`)}
  const exchangeContactButton = () => {navigate(`ExContact/`)}
  const toggleLogOut = () =>{(auth.currentUser?.uid == UserPage) ? setShowLogOut(!showLogOut) : navigate('/')}
  const toggleLinkPage = () => {setShowAddLink(!showAddLink)}
  const toggleSLinkPage = () => {setShowAddSLink(!showAddSLink)}

  async function docExist(userID){
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      
      if (Object.keys(profile).length == 0){
        
        setProfile(docSnap.data())
        setUserExist(true)       
      }
    } else {
      setFetchRequest("No Profile Found")
      if (Object.keys(profile).length != 0){
        
        setProfile({})
        setUserExist(false)   
      }
    }
  }

      

    function saveContactsButton(){
      const vCardsJS = vCardFactory;
      const vCard = vCardsJS();
      
      vCard.firstName = profile.FirstName
      vCard.lastName = profile.LastName
      vCard.photo.attachFromUrl(profile.Avatar, 'JPEG');
      vCard.workPhone = profile.Phone
      vCard.title = profile.Title
      vCard.url = `https://voidcard.netlify.app/${auth.currentUser.uid}`
      vCard.note = profile.Notes
      vCard.socialUrls['custom'] = profile.Slinks.Slink1
      vCard.socialUrls['custom'] = profile.Slinks.Slink2
      vCard.socialUrls['custom'] = profile.Slinks.Slink3      
      vCard.socialUrls['custom'] = profile.Slinks.Slink4

      
      const FileSaver = saveAs;
      const blob = new Blob([ vCard.getFormattedString() ], {type: "text/vcard;charset=utf-8"});
      FileSaver(blob, "blob.vcf");

    }

    function setCSSVariables(variable,color) {
      const r = document.querySelector(':root');
      r.style.setProperty(variable, color);
    }





    useEffect(()=>{
      setCSSVariables('--ProfileColor',profile.Theme?.ProfileColor)
      setCSSVariables('--BGColor',profile.Theme?.BGColor)
      setCSSVariables('--TextColor',profile.Theme?.TextColor)
      setCSSVariables('--SubTextColor',profile.Theme?.SubTextColor)
      setCSSVariables('--BodyTextColor',profile.Theme?.BodyTextColor)
      setCSSVariables('--BodySubTextColor',profile.Theme?.BodySubTextColor)
      setCSSVariables('--ButtonColor',profile.Theme?.ButtonColor)
      setCSSVariables('--AccentColor',profile.Theme?.AccentColor)
      const headerColor = pSBC(0.35,profile.Theme?.BGColor)
      const buttonHover = pSBC(0.04,profile.Theme?.ButtonColor)
      setCSSVariables('--headerColor',headerColor)
      setCSSVariables('--buttonHover',buttonHover)

    },[profile.Theme])
    docExist(UserPage)
    
    return (
      <div className="App relative top-20 h-[110%] bg-[color:var(--BGColor)]">
        {showAddLink && <AddLinkPage key={'linxk'}  toggleLinkPage={toggleLinkPage}/>}
        {showAddSLink && <AddSLinkPage key={'lixk'}  toggleSLinkPage={toggleSLinkPage} userData={profile} showAddSLink={showAddSLink}/>}
        {showLogOut && <Logout toggleLogOut={toggleLogOut}/>}
        {!userExist && (
        <div className='absolute z-20 top-0 h-[752px] w-full bg-slate-400'>
          <h1 className='text-center text-2xl font-bold'>{fetchRequest}</h1>j
        </div>)}
        
        <button onClick={toggleLogOut} className='absolute z-10 -top-32 w-20 h-5'></button>              
       
          {profile.Theme?.CoverIMG && 
            <div className='absolute -top-[12rem] bg-white h-[30%] bg-[color:var(--BGColor)] shadow-sm shadow-black w-full overflow-hidden'>
              <img className=' object-cover relative top-10 h-full object-center-top w-full' src={profile.Theme?.CoverIMG}alt="" />
            </div>}
        {userExist && <div className='lg:left-[29%] flex lg:border-10 border-gray-300 overflow-hidden h-[250px] w-50 lg:w-[40%] bg-slate-600 mx-4 rounded-2xl relative bottom-10 shadow-md shadow-black -top-4'>
          
          <div className='h-[100%] w-[50%] overlow-hidden bg-orange-800'>
            <img className="object-cover w-[100%] h-[100%]"src={profile.Avatar} alt=''/>
          </div> 
          <div className={`relative h-[100%] w-[50%] bg-[color:var(--ProfileColor)]`}>
          {auth.currentUser?.uid == UserPage && <button onClick={editPageButton} className='bg-white right-6 top-48 z-10 absolute text-xl p-2 rounded-full shadow-sm shadow-black h-10 w-10'><AiFillEdit /></button>}      
            <div className=' break-words absolute top-0 px-3 py-8  h-full w-full'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[color:var(--TextColor)]'>{profile.FirstName} {profile.LastName}</h1>
              <p className=" lg:text-lg font-semibold text-gray-500 text-[color:var(--SubTextColor)]">
              {profile.Title}
                </p>
            </div>
          </div>
        </div>}

        <div className='flex justify-around lg:justify-center'>
          <Buttons size={2} text={"Save Contacts"} clicked={saveContactsButton}/>
          <Buttons size={2} text={"Exchange Contacts"} clicked={exchangeContactButton}/>
        </div>
        <div className='about h-fit p-5 text-lg break-words'>
          <h1 className='text-4xl font-bold lg:text-center text-[color:var(--BodyTextColor)]'>About</h1>
          <p className='text-gray-400 text-2xl lg:text-center text-[color:var(--BodySubTextColor)]'>{profile.About}</p>
        </div>
        <Social Slinks={profile?.Slinks}  toggleSLinkPage={toggleSLinkPage} auth={auth.currentUser?.uid}/>
        <Links key={'linkskey'} showAddLink={showAddLink} showAddSLink={showAddSLink} toggleLinkPage={toggleLinkPage} Llinks={profile?.Llinks} userid={UserPage}  auth={auth.currentUser?.uid}/>
      </div>
    )
  }
  //link1={profile.Social.link1} link2={profile.Social.link2} link3={profile.Social.link3} link4={profile.Social.link4}
//link1={profile.Links.link1} link2={profile.Links.link2} link3={profile.Links.link3} link4={profile.Links.link4}

