import React, { useContext } from "react";
import { Navigate } from "react-router";

import { UserContext } from "../../contexts/AuthContext";

const ProtectedIfUserIsNotLogged = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user === null || user.role === "disabled") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedIfUserIsNotLogged;
