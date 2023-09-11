import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyAVaLGKcE2R3FD91CpDYECgCPLU0bGEOE0",
//   authDomain: "property247-954ca.firebaseapp.com",
//   projectId: "property247-954ca",
//   storageBucket: "property247-954ca.appspot.com",
//   messagingSenderId: "38697153290",
//   appId: "1:38697153290:web:2e94f1507c0f5162d6c0f3",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAVaLGKcE2R3FD91CpDYECgCPLU0bGEOE0",
  authDomain: "property247-954ca.firebaseapp.com",
  projectId: "property247-954ca",
  storageBucket: "property247-954ca.appspot.com",
  messagingSenderId: "38697153290",
  appId: "1:38697153290:web:614920ec2acdc247d6c0f3",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;
