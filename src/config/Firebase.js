// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2FIwYyhGSLdMgCbnlBauPBfcAnU-da5Y",
  authDomain: "void-card.firebaseapp.com",
  projectId: "void-card",
  storageBucket: "void-card.appspot.com",
  messagingSenderId: "622952930046",
  appId: "1:622952930046:web:b67677f821b6ec98c1a3af",
  measurementId: "G-N3R321YJMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export default {app}
export {auth, db, storage}



