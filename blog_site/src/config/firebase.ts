// Import the functions you need from the SDKs you need

import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhtu5_k1MoI3sRWsTLZ-jwUsDRrPKv8uo",
  authDomain: "react-typescript-c6c44.firebaseapp.com",
  projectId: "react-typescript-c6c44",
  storageBucket: "react-typescript-c6c44.appspot.com",
  messagingSenderId: "996006390966",
  appId: "1:996006390966:web:926646b200ebeecdda8a17",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
