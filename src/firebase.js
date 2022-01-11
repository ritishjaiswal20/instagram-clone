import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the follow ing with your app's Firebase project configuration
const firebaseConfig = {
  //...
    apiKey: "AIzaSyBs_SrM1zARcKKLP3Z9VrLNuefnY6AEfbA",
    authDomain: "instagram-clone-9f0ac.firebaseapp.com",
    projectId: "instagram-clone-9f0ac",
    storageBucket: "instagram-clone-9f0ac.appspot.com",
    messagingSenderId: "915370260973",
    appId: "1:915370260973:web:f007136739cb14e3b78fe4",
    measurementId: "G-X7FVDXLMJM"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default {db,storage};

