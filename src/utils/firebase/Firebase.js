// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// To be removed in the future
const firebaseConfig = {
  apiKey: "AIzaSyDeqFkWVbtD4Sv3IsO5fTGpa3pGfhH9ULs",
  authDomain: "qwikydb.firebaseapp.com",
  databaseURL: "https://qwikydb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qwikydb",
  storageBucket: "qwikydb.appspot.com",
  messagingSenderId: "594764629934",
  appId: "1:594764629934:web:c2851bafe196022c82aa3f",
  measurementId: "G-1BXT942W6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Database = getDatabase();

export { app, Database }

