import { createContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

import firebaseApp from "../firebase/firebase";
import { toast } from "react-toastify";
const auth = getAuth(firebaseApp);
const db = getDatabase();
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
      toast.error("Email o contraseña son incorrectas");
      console.log(error);
    });
    console.log(user);
  };

  const logOutUser = () => {
    signOut(auth);
  };

  const createUser = async (email, password, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      set(ref(db, "users/" + user.uid), {
        email: email,
        role: role,
      });

      console.log("Usuario creado y registrado en la base de datos.");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email ya está en uso");
        console.log(error);
      }
      console.log(error);
    }
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

  const getRole = async (userId) => {
    try {
      const snapshot = await get(ref(getDatabase(), `users/${userId}/role`));
      const role = snapshot.val();
      return role;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const contextValue = { createUser, logInUser, logOutUser, user };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default AuthContextProvider;
