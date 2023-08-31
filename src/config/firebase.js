import { initializeApp } from "firebase/app";
//import firestore db
import {getFirestore} from "firebase/firestore"

//import firebase auth service
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
//import firebase storage service
import {getStorage} from "firebase/storage"


// Firebase configuration settings
const firebaseConfig = {
  apiKey: "AIzaSyDNVinkq8rcnlgkItQ1K1JrOycMal81T1E",
  authDomain: "trading-card-manager-1fa28.firebaseapp.com",
  projectId: "trading-card-manager-1fa28",
  storageBucket: "trading-card-manager-1fa28.appspot.com",
  messagingSenderId: "215436711931",
  appId: "1:215436711931:web:00ddbfd416cc9833025d5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firestore with app configurations, then export firestore database.
export const firestore = getFirestore(app)

//export auth service.
export const auth = getAuth(app)

//export storage service.
export const storage = getStorage(app)

//represents google auth service.
const providerGoogle = new GoogleAuthProvider()

//google sign in with popup.
export const signInWithGoogle = async () => {
  try{
    const userInfo = await signInWithPopup(auth, providerGoogle)
    return userInfo
  }
  catch(err){
    console.log("Error, couldn't sign in with google.")
  }

}

export default app
