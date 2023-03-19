// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "ring-pong.firebaseapp.com",
  projectId: "ring-pong",
  storageBucket: "ring-pong.appspot.com",
  messagingSenderId: "471534245215",
  appId: "1:471534245215:web:2e84fbcd79af4deac312ea",
  measurementId: "G-F7HWR0FKN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();