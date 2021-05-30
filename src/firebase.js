// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/app";
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyA7tkPwoWNN_8RjVkrFCYTpjSTevTJ8utQ",
  authDomain: "todo-app-react-6b994.firebaseapp.com",
  projectId: "todo-app-react-6b994",
  storageBucket: "todo-app-react-6b994.appspot.com",
  messagingSenderId: "429778075200",
  appId: "1:429778075200:web:022728e9de8df46dc5e9a5",
  measurementId: "G-CFND0T7S76",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;