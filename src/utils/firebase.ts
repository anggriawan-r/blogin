import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogin-f3212.firebaseapp.com",
  projectId: "blogin-f3212",
  storageBucket: "blogin-f3212.appspot.com",
  messagingSenderId: "177366455632",
  appId: "1:177366455632:web:d75726968e9d9a74e28855",
};

export const app = initializeApp(firebaseConfig);
