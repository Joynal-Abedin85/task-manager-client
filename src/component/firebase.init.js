
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrPfQQHCMOkF60neuBvoSZGjiQigRVfpo",
  authDomain: "task-manage-8ff16.firebaseapp.com",
  projectId: "task-manage-8ff16",
  storageBucket: "task-manage-8ff16.firebasestorage.app",
  messagingSenderId: "125743722788",
  appId: "1:125743722788:web:a0511fb5e2e76061f343b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);