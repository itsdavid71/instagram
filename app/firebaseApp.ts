// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCS582s_YUJpInsdTynVwKv6PLt79VEd5Y",
  authDomain: "inordic-instagram.firebaseapp.com",
  projectId: "inordic-instagram",
  storageBucket: "inordic-instagram.appspot.com",
  messagingSenderId: "923888199914",
  appId: "1:923888199914:web:8883cc4edda3b2d92d4f93",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
