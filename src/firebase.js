// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAVaLGKcE2R3FD91CpDYECgCPLU0bGEOE0",
//   authDomain: "property247-954ca.firebaseapp.com",
//   projectId: "property247-954ca",
//   storageBucket: "property247-954ca.appspot.com",
//   messagingSenderId: "38697153290",
//   appId: "1:38697153290:web:614920ec2acdc247d6c0f3",
// };

// export const app = firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export default firebase;


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRs6Y5qyHvZT9HEEBbDJRWeLM2cTpiSWY",
  authDomain: "otpmsg-780cd.firebaseapp.com",
  projectId: "otpmsg-780cd",
  storageBucket: "otpmsg-780cd.appspot.com",
  messagingSenderId: "590087856593",
  appId: "1:590087856593:web:50e2aa18aa18dcfcb040f0",
  measurementId: "G-J2T71FW3KW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);