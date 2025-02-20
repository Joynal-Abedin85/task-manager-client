// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzaYFWtZGSAaHoDmPWbTNSLzvbYNmws-U",
  authDomain: "visa-page.firebaseapp.com",
  projectId: "visa-page",
  storageBucket: "visa-page.firebasestorage.app",
  messagingSenderId: "119479379053",
  appId: "1:119479379053:web:fcac61ceb98654c7c5cb64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);