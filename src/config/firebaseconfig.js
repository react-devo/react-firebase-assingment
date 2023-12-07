import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Replace these with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDLQhvtG7wjFUQxvp-wY3YwwGWwu_ubOtk",
    authDomain: "reat-login.firebaseapp.com",
    projectId: "reat-login",
    storageBucket: "reat-login.appspot.com",
    messagingSenderId: "1007497162313",
    appId: "1:1007497162313:web:e03629f6c92bd67cd95998"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  export default db;