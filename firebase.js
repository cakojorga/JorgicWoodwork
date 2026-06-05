// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA47dnZ9gf06ynF4zYpajeg7ZE25VNrRFI",
  authDomain: "jorgicwoodwork.firebaseapp.com",
  projectId: "jorgicwoodwork",
  storageBucket: "jorgicwoodwork.firebasestorage.app",
  messagingSenderId: "926061100244",
  appId: "1:926061100244:web:1be15819601d36f4ea4f41",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
