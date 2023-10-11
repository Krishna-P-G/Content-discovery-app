// import { useContext, createContext, useState, useEffect } from "react";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";

// import { auth } from "../firebase";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {

//   const [user, setUser] = useState({});

//   const googleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (error) {
//       console.error("Google Sign-In Error: ", error);
//     }
//   };

//   const logOut = () => {
//     signOut(auth)
//   }

//   useEffect (() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//         setUser(currentUser);
//         console.log('User', currentUser)
//     });
//     return () => {
//         unsubscribe();
//     };
//   }, []);
//   return (
//     <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
