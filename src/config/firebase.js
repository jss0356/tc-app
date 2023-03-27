import { initializeApp } from "firebase/app";
//import firestore
import {getFirestore} from "@firebase/firestore"

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
//initialize firestore with app configurations
const firestore = getFirestore(app)