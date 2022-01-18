import firebase from "firebase/app";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDP7ts1oO_YwDsaxdk7d4ItU-jIVGG4nEw",
    authDomain: "ui-uranus.firebaseapp.com",
    projectId: "ui-uranus",
    storageBucket: "ui-uranus.appspot.com",
    messagingSenderId: "1080841123458",
    appId: "1:1080841123458:web:0d5ad6a477bf36537f669b"
}

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;