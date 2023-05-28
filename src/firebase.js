import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBsbt5qHF8TzGAgHvOKQ3tN7Ap-gITQkE8",
  authDomain: "yk-to-do.firebaseapp.com",
  projectId: "yk-to-do",
  storageBucket: "yk-to-do.appspot.com",
  messagingSenderId: "19782048784",
  appId: "1:19782048784:web:68c53ffc9af4d32672be95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app
