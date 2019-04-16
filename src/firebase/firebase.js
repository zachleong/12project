import firebase from 'firebase/app';
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyCBOySSw3riF7HEgU2rJgp4aONEvxZhwsk",
    authDomain: "vue-firebase-4cc1a.firebaseapp.com",
    databaseURL: "https://vue-firebase-4cc1a.firebaseio.com",
    projectId: "vue-firebase-4cc1a",
    storageBucket: "vue-firebase-4cc1a.appspot.com",
    messagingSenderId: "809699793301"
  };
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged( user => {
    if (user) {
        console.log(`user is ${user}`);
        
    }
});
console.log("firebase initialized");