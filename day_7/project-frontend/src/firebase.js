// // import firebase from "firebase/app";
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import { serverTimestamp } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // https://project-content-f6ccc.firebaseapp.com/__/auth/handler
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBcz7SEGuJ15fcYrpuT5GnikIxtF4qJRZM",
//   authDomain: "project-content-f6ccc.firebaseapp.com",
//   projectId: "project-content-f6ccc",
//   storageBucket: "project-content-f6ccc.appspot.com",
//   messagingSenderId: "286491112912",
//   appId: "1:286491112912:web:67c981d2cccee76dab75d5"
// };

// // Initialize Firebase
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp({});
// }
// const auth = firebaseApp.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// const timestamp = serverTimestamp();
// export { auth, provider, timestamp };