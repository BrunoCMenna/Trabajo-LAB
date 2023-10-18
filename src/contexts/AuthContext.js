import { createContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "../firebase/firebase";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const auth = getAuth(firebaseApp);
const db = getDatabase();
export const UserContext = createContext(null);

const userCookie = Cookies.get("user");
const userTokenCookie = Cookies.get("userToken");

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(userCookie);
  const [token, setToken] = useState(userTokenCookie);

  const logOutUser = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("user");
    Cookies.remove("userToken");
  };

  //deberiamos eliminar esto no?
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

  const logInUser = (token) => {
    const myDecodedToken = decodeToken(token);
    console.log(myDecodedToken);
    setToken(token);
    setUser(myDecodedToken);
    Cookies.set("user", JSON.stringify(myDecodedToken));
    Cookies.set("userToken", token);
  };

  const contextValue = {
    createUser,
    logInUser,
    logOutUser,
    user,
    token,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default AuthContextProvider;
