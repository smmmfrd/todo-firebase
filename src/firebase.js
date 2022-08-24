import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

firebase.initializeApp({
    apiKey: "AIzaSyCiXb1CxaueyrTvbYCjxgO7wQwZmvsx6RM",
    authDomain: "todo-a03ed.firebaseapp.com",
    projectId: "todo-a03ed",
    storageBucket: "todo-a03ed.appspot.com",
    messagingSenderId: "695852202001",
    appId: "1:695852202001:web:34934adbff5cea6d3399b0"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export {firebase, auth, firestore}