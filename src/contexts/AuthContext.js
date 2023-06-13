import { createContext, useState } from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import firebaseApp from "../firebase/firebase";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
export const UserContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (fbUser) => {
    if (fbUser) {
      if (!user) {
        setUserWithFirebaseAndRole(fbUser);
      }
    } else {
      setUser(null);
    }
  });

  const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert("Email o contraseña son inválidos");
      console.log(error);
    });
    console.log(user);
  };

  const logOutUser = () => {
    signOut(auth);
  };
  const createUser = async (email, password, role) => {
    const userInfo = await createUserWithEmailAndPassword(auth, email, password)
      .then((firebaseUser) => {
        return firebaseUser;
      })
      .catch((error) => {
        alert("Email ya está en uso"); //TODO: mejorar manejo de error
        console.log(error);
      });
    console.log(userInfo);
    const docRef = await doc(firestore, `users/${userInfo.user.uid}`);
    setDoc(docRef, { email: email, password: password, role: role });
  };

  const setUserWithFirebaseAndRole = (fbUser) => {
    getRole(fbUser.uid).then((role) => {
      const userData = {
        uid: fbUser.uid,
        email: fbUser.email,
        role: role,
      };
      setUser(userData);
      console.log(userData);
    });
  };

  const getRole = async (uid) => {
    const docuRef = doc(firestore, `users/${uid}`);
    const docuData = await getDoc(docuRef);
    const finalInfo = docuData.data().role;
    return finalInfo;
  };

  const contextValue = { createUser, logInUser, logOutUser, user };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default AuthContextProvider;
