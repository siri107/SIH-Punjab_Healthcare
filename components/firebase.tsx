// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj6a8oVWqdR6SJZOE4yu3k1HLMMSHl7YM",
  authDomain: "telemed-c0536.firebaseapp.com",
  projectId: "telemed-c0536",
  storageBucket: "telemed-c0536.firebasestorage.app",
  messagingSenderId: "371197936255",
  appId: "1:371197936255:web:f3738685c6b83acd2d754a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);