import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyADETEgadqemywMeGORRw-ot9uTorvtdtk",
    authDomain: "todo-ninja-3a649.firebaseapp.com",
    databaseURL: "https://todo-ninja-3a649.firebaseio.com",
    projectId: "todo-ninja-3a649",
    storageBucket: "todo-ninja-3a649.appspot.com",
    messagingSenderId: "483971262568",
    appId: "1:483971262568:web:4dfd7f340d78566ddf33dd",
    measurementId: "G-ZGNQS4PPW7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db;