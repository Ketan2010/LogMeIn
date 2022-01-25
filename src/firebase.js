import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD8ZYY1gDn01y1SIIDTdFsFvM8yUPCmU3Q",
    authDomain: "logmein-34e89.firebaseapp.com",
    projectId: "logmein-34e89",
    storageBucket: "logmein-34e89.appspot.com",
    messagingSenderId: "936820541400",
    appId: "1:936820541400:web:3060b57f2e44de0afb14ad"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp };
export default firebaseApp;