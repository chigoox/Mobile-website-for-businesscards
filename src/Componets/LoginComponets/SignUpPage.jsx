import React, { useState } from 'react'
import Buttons from '../Buttons'
import LoginError from './LoginError';
import { db, auth } from '../../config/Firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


function SignUpPage(props) {
    const [data, setData] = useState()
    const [errorTransfer, setErrorTransfer] = useState([]);
    const navigate = useNavigate()
    function errorCatcher(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorTransfer([errorCode, errorMessage])
    }
    function clearError() {
        setErrorTransfer([])
    }



    async function addUserToDatabase(user) {
        const docRef = doc(db, "users", user.uid)
        const dataCreation = {
            email: data.Email,
            displayName: user.providerData[0].displayName,
            Avatar: "https://img.freepik.com/premium-vector/anonymous-user-flat-icon-vector-illustration-with-long-shadow_520826-1932.jpg?w=2000",
            FirstName: data.FirstName,
            LastName: data.LastName,
            Phone: data.Phone,
            Title: "Your Title Here",
            About: "About You Here",
            Slinks: {},
            Llinks: [],
            Theme: {
                "BGColor": "#ffffff",
                "AccentColor": "#bfbfbf",
                "ProfileColor": "#ffffff",
                "TextColor": "#000000",
                "BodySubTextColor": "#5c5c5c",
                "SubTextColor": "#4a4a4a",
                "ButtonColor": "#ffffff",
                "CoverIMG": "https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
            }
        }
        await setDoc(docRef, dataCreation);


    }

    function createAccount(acountInfo) {
        if (acountInfo?.Password == acountInfo?.CPassword && acountInfo?.Password.match(/[A-Z1-9!@#$%&*?]/) != null && acountInfo?.Password.match(/[a-z]+/) != null) {
            createUserWithEmailAndPassword(props.auth, acountInfo.Email, acountInfo.Password)
                .then((userCredential) => {
                    const user = userCredential.user
                    addUserToDatabase(user)
                    const uid = userCredential.user.uid
                    navigate(`/${uid}/profileEdit`)

                })
                .catch((error) => {
                    errorCatcher(error)
                });
        } else if (acountInfo?.Password.match(/[A-Z1-9!@#$%&*?]/) != null || acountInfo?.Password.match(/[A-Z]+/) != null) {
            errorCatcher({ code: "Weak password-", message: "-Password Needs Capital letter and symbol" })
        } else {
            errorCatcher({ code: "Password Mixmatch-", message: "-Password does not match" })
        }

    }

    function DataSetter(key, value) {
        setData((data) => {
            return data = { ...data, [key]: value }
        })
    }
    function handleChangeInput(event) {
        DataSetter(event.target.name, event.target.value)
    }
    return (
        <div className='absolute z-40 left-0 top-0 lg:h-[99.5%] h-[89.5%] w-[99vw]'>
            {errorTransfer.length > 0 && <LoginError clicked={clearError} error={errorTransfer} />}
            <div className="relative lg:w-[25vw]  top-4 shadow-black shadow-md bg-gradient-to-t from-slate-900 to-slate-800 w-fit   lg:px-[3%] px-[8%] py-10 h-fit m-auto rounded-lg border-violet-600 border-opacity-30 border-2">
                <button onClick={props.toggleSignup} className='absolute -top-5  right-[45%] rounded-full bg-slate-500 text-white w-12 h-12 border-4 border-slate-800 font-bold text-3xl hover:border-red-800 hover:bg-slate-900 hover:text-red-500'>X</button>
                <div className='top-[6%] relative'>
                    <h1 className='font-bold text-3xl text-center my-5 text-white'>Register</h1>
                    <div className=''>
                        <input placeholder={'First Name'} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'FirstName'} onChange={handleChangeInput} type={'text'} />
                        <input placeholder={'Last Name'} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'LastName'} onChange={handleChangeInput} type={'text'} />
                        <input placeholder={"Email"} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'Email'} onChange={handleChangeInput} type={'email'} />
                        <input placeholder={'Phone'} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'Phone'} onChange={handleChangeInput} type={'tel'} />
                        <input placeholder={'Password'} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'Password'} onChange={handleChangeInput} type={'password'} />
                        <input placeholder={'Password'} className={'bg-transparent border-2 rounded-full  my-1  p-2 w-[99%] h-12 font-bold text-lg text-white'} name={'CPassword'} onChange={handleChangeInput} type={'password'} />
                    </div>
                    <div className='w-full flex justify-center'>
                        <button className='h-14 m-14 font-bold text-white border-2 border-slate-400 w-3/4' onClick={() => { createAccount(data) }}>Sign Up</button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SignUpPage