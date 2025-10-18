// this needs to be done by - first craete a sub folder under SRC and the under create file named firebase.js and add this code 


// src/lib/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config (from your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyAPb5kIqo50UoYeipMK0sPQycqC6qCLBy0",
  authDomain: "website-database-a78d5.firebaseapp.com",
  projectId: "website-database-a78d5",
  storageBucket: "website-database-a78d5.appspot.com",
  messagingSenderId: "113963737146",
  appId: "1:113963737146:web:a459aed0516fdc033e1503",
  measurementId: "G-1JX4GCC0D4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database export
export const db = getFirestore(app);
