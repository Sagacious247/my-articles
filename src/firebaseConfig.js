import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP4jZ5sMMHsU5i2fZjDxeLjdDfcTdRNDM",
  authDomain: "my-articles-a60af.firebaseapp.com",
  projectId: "my-articles-a60af",
  storageBucket: "my-articles-a60af.appspot.com",
  messagingSenderId: "803490384962",
  appId: "1:803490384962:web:44503eec2b2790161871db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)