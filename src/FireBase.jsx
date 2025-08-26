import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqzs9-ao76MwTzX6LH3-KU-RO7ys5OHnE",
  authDomain: "domik-9eafa.firebaseapp.com",
  projectId: "domik-9eafa",
  storageBucket: "domik-9eafa.firebasestorage.app",
  messagingSenderId: "305413764993",
  appId: "1:305413764993:web:7470841a4ffa7415565a80",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
