import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
    apiKey: "AIzaSyDHAavPheDlzUHj2NyJGBda9sdLLcSIegM",
    authDomain: "chat-app-c2c2b.firebaseapp.com",
    projectId: "chat-app-c2c2b",
    storageBucket: "chat-app-c2c2b.appspot.com",
    messagingSenderId: "582764722818",
    appId: "1:582764722818:web:f84b422c76b4ff54d9929b",
    measurementId: "G-13DTJ6M7Q2"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);