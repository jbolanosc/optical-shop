import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBx4_Ht1Z6C3Owbca46xM6sECKEZiTfMHs",
  authDomain: "opticalshop-ebbf1.firebaseapp.com",
  databaseURL: "https://opticalshop-ebbf1.firebaseio.com",
  projectId: "opticalshop-ebbf1",
  storageBucket: "opticalshop-ebbf1.appspot.com",
  messagingSenderId: "29372721582",
  appId: "1:29372721582:web:231742941efe571c20403f",
  measurementId: "G-7D7W5TQ6VQ"
};
firebase.initializeApp(config);

firebase.firestore();

export default firebase;