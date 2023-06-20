import React, { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../../contexts/AuthContext";

const ProtectedIfUserIsLogged = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/shop" replace />;
  }

  return children;
};

export default ProtectedIfUserIsLogged;
