import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDw35pfzAnN9yIci57-2sOSEUqCVOUFNYU",
  authDomain: "njb-dealer.firebaseapp.com",
  projectId: "njb-dealer",
  storageBucket: "njb-dealer.appspot.com",
  messagingSenderId: "164629046900",
  appId: "1:164629046900:web:0272afdddf147355de5321",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
