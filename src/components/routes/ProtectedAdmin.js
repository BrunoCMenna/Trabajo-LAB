import React, { useContext } from "react";
import { Navigate } from "react-router";

import { UserContext } from "../../contexts/AuthContext";

const ProtectedAdmin = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role === "user") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedAdmin;
