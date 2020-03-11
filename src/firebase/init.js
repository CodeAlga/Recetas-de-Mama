import firebase from "firebase";
//import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-2pdIXHWp33Yjt4I1w2IT5lrq520JA8Q",
  authDomain: "recetasdemama-e3973.firebaseapp.com",
  databaseURL: "https://recetasdemama-e3973.firebaseio.com",
  projectId: "recetasdemama-e3973",
  storageBucket: "recetasdemama-e3973.appspot.com",
  messagingSenderId: "742890436125",
  appId: "1:742890436125:web:34d4017d5f3b259f10b8f4",
  measurementId: "G-S7R4K701BG"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });

// Export firestore database
export default firebaseApp.firestore();

//firebase.analytics();
