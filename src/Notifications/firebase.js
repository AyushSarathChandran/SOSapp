// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsguWxLNH_P9vIEZ7R2yxAtFfxjifFUIg",
  authDomain: "sosapp-de6ef.firebaseapp.com",
  projectId: "sosapp-de6ef",
  storageBucket: "sosapp-de6ef.firebasestorage.app",
  messagingSenderId: "85444192475",
  appId: "1:85444192475:web:3188749d7979a5ef40c4fe",
  measurementId: "G-TK8YZGZP05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
export const generateToken = async () =>{
    const permission = await Notification.requestPermission();
    console.log(permission);
    if(permission === "granted"){
        const token = await getToken(messaging,{
            vapidKey: "BCA3ZC_UkG5NZz1DZSeCEiMLekjxv4yj-d0mUvaLu8W0LBzj0q9cl92uHjVqnL60x1MXq3PCo8iwxfBdd9oyDAw",
        });
        console.log(token);
    }

};