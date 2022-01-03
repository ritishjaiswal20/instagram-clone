import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// other services is needed
const firebaseConfig = {
    apiKey: "AIzaSyBs_SrM1zARcKKLP3Z9VrLNuefnY6AEfbA",
    authDomain: "instagram-clone-9f0ac.firebaseapp.com",
    projectId: "instagram-clone-9f0ac",
    storageBucket: "instagram-clone-9f0ac.appspot.com",
    messagingSenderId: "915370260973",
    appId: "1:915370260973:web:f007136739cb14e3b78fe4",
    measurementId: "G-X7FVDXLMJM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();


export default db;
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);