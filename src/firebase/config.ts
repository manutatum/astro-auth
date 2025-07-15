import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAu8Ad2qg4BWk2ytInclNvCeSB17h-Fhs0",
  authDomain: "astro-authentication-53dd9.firebaseapp.com",
  projectId: "astro-authentication-53dd9",
  storageBucket: "astro-authentication-53dd9.firebasestorage.app",
  messagingSenderId: "91293832277",
  appId: "1:91293832277:web:c109a8a7f560581e2eb0dc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
    app,
    auth
}