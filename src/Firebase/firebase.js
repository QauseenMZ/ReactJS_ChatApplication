import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCET6hXxfX2XiscDpMM93PZ9O5VVc50wsY",
    authDomain: "reactjs-chatapplication.firebaseapp.com",
    databaseURL: "https://reactjs-chatapplication.firebaseio.com",
    projectId: "reactjs-chatapplication",
    storageBucket: "reactjs-chatapplication.appspot.com",
    messagingSenderId: "505405413585"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;