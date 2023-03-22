import React, { useState} from 'react';
import SignUpPage from '../Componets/LoginComponets/SignUpPage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import LoginError from '../Componets/LoginComponets/LoginError';
import {useNavigate} from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from '../config/Firebase';
import logo from '../assets/voidlogo.png'


export default function LoginPage() {
    const [userPass, setUserPass] = useState({})
    const [errorTransfer, setErrorTransfer] = useState([]);
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false)
    
    
    

    function errorCatcher(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorTransfer([errorCode,errorMessage])  
    }

    function clearError(){
        setErrorTransfer([])
    }

    const toggleSignup = () => {setShowSignUp(!showSignUp)}


    async function addUserToDatabase(user){
        const docRef = doc(db, "users", user.uid) 
        const data = {
                email: user.email,
                displayName: user.providerData[0].displayName,
                Avatar: "https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg?w=2000",
                FirstName: "Sasha",
                LastName:  "Candy",
                Title: "Your Title Here",
                About: "About You Here",
            }
        await setDoc(docRef, data);
            
         
    }


    function loginRegister(event){
        
        if (event.target.innerText == "Sign Up"){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, userPass.user, userPass.pass)
            .then((userCredential) => {
                const user = userCredential.user
                addUserToDatabase(user)
                
            })  
            .catch((error) => {
                errorCatcher(error)
            });

        }else{
            signInWithEmailAndPassword(auth, userPass.user, userPass.pass)
            .then((userCredential) => {
                const uid = userCredential.user.uid
                localStorage.setItem("userData", userCredential.user)
                console.log('logged in')
                setUser(userCredential.user)
                navigate(`/${uid}`)
               
            })
            .catch((error) => {
                errorCatcher(error)
                
            });


        }
   
    }



    function handleInputChange(event){
        setUserPass(cred => {
            return(
                event.target.name === "user" ? 
                cred = {...cred, user: event.target.value} 
                : {...cred, pass: event.target.value}
                
                )
            })
        }
        

        //pageFrom(true, uid)
        return (
        <div className="Login relative h-screen bg-gradient-to-tr to-cyan-500 from-rose-900 py-4">
            <div className="lg:visi ble invisible absolute w-fit h-9 top-9 p-1 right-[27%] bg-gradient-to-bl from-slate-700 to-slate-900 shadow shadow-black">
                <h3 className='text-center font-bold text-white text-lg'>Welcome back!</h3>
            </div>
            {showSignUp && <SignUpPage auth={auth} toggleSignup={toggleSignup}/>}
            <div className='overflow-hidden h-[700px] w-50 m-4 md:m-auto rounded-2xl relative shadow-xl bg-gradient-to-b from-black  to-slate-900 lg:w-[30%]'>
                {errorTransfer.length > 0 && <LoginError clicked={clearError} error={errorTransfer}/>}
                <div className="relative h-[100%] w-[100%]">
                    <div className='absolute h-[50%] w-full'>
                        <div className='relative z-0 shadow-lg m-auto mt-5 h-[250px] w-[250px] rounded-full overflow-hidden'>
                            <img src={logo} alt="" />
                        </div>
                    </div>
                    <div className='w-full absolute top-80'>
                        <div className='inputContainer flex justify-center  flex-wrap lg:flex-col relative lg:left-[10%] p-4 '>
                            <input name="user"onChange={handleInputChange} className="bg-transparent rounded-full my-1  h-12 lg:w-[80%] w-[90%] border-[3px] border-white text-white text-center"type="text" placeholder='Email'></input>
                            <input name="pass"onChange={handleInputChange} className="bg-transparent rounded-full my-1 text-center h-12 lg:w-[80%] border-[3px] w-[90%] border-white text-white "type="password" placeholder='Password'></input>
                        </div>
                        <div className='my-16 flex flex-col' >
                            <button onClick={loginRegister} className='hover:text-cyan-300 hover:bg-white bg-gradient-to-l from-blue-900 to-slate-900 shadow-lg  rounded-full h-14 w-[65%] m-auto mb-4 border-white text-white font-bold lg:text-4xl text-3xl text-center p-2'>Log In</button>
                            <div className="flex justify-center">
                                <p className='text-white text-center'>Don't have an account?</p>
                                <button onClick={toggleSignup}  className='hover:text-orange-400 w-fit text-white font-bold text-center ml-1'>Sign Up</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
                    //<img className="object-cover w-[100%] h-[100%]"src='https://t4.ftcdn.net/jpg/03/47/15/51/360_F_347155190_uOpdyhRV68cSrx0fTwOH6MVTkvXpWHmG.jpg' alt=''/>
    )

}
