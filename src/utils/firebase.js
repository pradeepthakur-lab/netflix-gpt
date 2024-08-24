// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOWjw8UaPMyskXLSjuXpup4Pmaw_Flh3I",
  authDomain: "netflixgpt-4e0ba.firebaseapp.com",
  projectId: "netflixgpt-4e0ba",
  storageBucket: "netflixgpt-4e0ba.appspot.com",
  messagingSenderId: "746724434428",
  appId: "1:746724434428:web:f057afe324a841fe79d279",
  measurementId: "G-9S1XRY7ZY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

// https://netflixgpt-4e0ba.web.app