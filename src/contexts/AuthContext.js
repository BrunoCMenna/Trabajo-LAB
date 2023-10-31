import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const UserContext = createContext(null);

const userCookie = Cookies.get("user");
const userTokenCookie = Cookies.get("userToken");

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(userCookie ? JSON.parse(userCookie) : null);
  const [token, setToken] = useState(userTokenCookie);

  const logOutUser = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("user");
    Cookies.remove("userToken");
  };

  const logInUser = (token) => {
    const myDecodedToken = decodeToken(token);
    setToken(token);
    setUser(myDecodedToken);
    Cookies.set("user", JSON.stringify(myDecodedToken));
    Cookies.set("userToken", token);
  };

  const contextValue = {
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
