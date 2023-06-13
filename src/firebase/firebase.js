// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx3Eiss07r14xCfsYJUrPmRp7yKk-DD8Y",
  authDomain: "ecommerce-lab3.firebaseapp.com",
  projectId: "ecommerce-lab3",
  storageBucket: "ecommerce-lab3.appspot.com",
  messagingSenderId: "337458973179",
  appId: "1:337458973179:web:29e73da94f6ccc3766e35e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
