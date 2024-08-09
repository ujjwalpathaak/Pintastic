import { initializeApp } from "firebase/app";

let FIREBASE_KEY = process.env.NEXT_PUBLIC_FIREBASE_KEY;

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "pintastic-6ea0e.firebaseapp.com",
    databaseURL: "https://pintastic-6ea0e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pintastic-6ea0e",
    storageBucket: "pintastic-6ea0e.appspot.com",
    messagingSenderId: "834784822850",
    appId: "1:834784822850:web:9f848fccb52ca1505d8fdb",
    measurementId: "G-XDXSDDGT29"
};

const app = initializeApp(firebaseConfig);

export default app;