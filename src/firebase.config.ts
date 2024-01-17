import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDOT3eflEYzFqUAokKBJCxT7tm1oPDJqg",
  authDomain: "task-f45ce.firebaseapp.com",
  projectId: "task-f45ce",
  storageBucket: "task-f45ce.appspot.com",
  messagingSenderId: "972708906049",
  appId: "1:972708906049:web:5662e5ddcb5b06166e32c0"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);