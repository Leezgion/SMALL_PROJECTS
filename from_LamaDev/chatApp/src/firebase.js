import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLxRzHEs0FC3JBtEvu_umAOmFm7xlBPac",
  authDomain: "leezgion-chat-room.firebaseapp.com",
  projectId: "leezgion-chat-room",
  storageBucket: "leezgion-chat-room.appspot.com",
  messagingSenderId: "793707094616",
  appId: "1:793707094616:web:31157c78e854a96e29602d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
