
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCSM1zoB1ZlEaRtKOCGLOPhw3NBTjnxyKo",
    authDomain: "moviln-8966e.firebaseapp.com",
    projectId: "moviln-8966e",
    storageBucket: "moviln-8966e.firebasestorage.app",
    messagingSenderId: "270170829250",
    appId: "1:270170829250:web:0f28aa71ec33380018a65b"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
