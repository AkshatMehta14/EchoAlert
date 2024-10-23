// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-_XYR8Y3gOqDtXccWJa1EWreSNiXPQ54",
  authDomain: "echoalert-e3576.firebaseapp.com",
  projectId: "echoalert-e3576",
  storageBucket: "echoalert-e3576.appspot.com",
  messagingSenderId: "957257033815",
  appId: "1:957257033815:web:2561a6f18ef282d5c95b12",
  measurementId: "G-1ZGSSPM2TC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
console.log("f", firestore);
