import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBis7u147G3JmcQfPUn3lcJGmJgFzoek0",
  authDomain: "reactlinks-b7dc3.firebaseapp.com",
  projectId: "reactlinks-b7dc3",
  storageBucket: "reactlinks-b7dc3.firebasestorage.app",
  messagingSenderId: "979759372109",
  appId: "1:979759372109:web:bbabaad04083c1a7a98904"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export{auth, db}