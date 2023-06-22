import React, { useContext } from "react";
import { Navigate } from "react-router";

import { UserContext } from "../../contexts/AuthContext";

const ProtectedUserPanel = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedUserPanel;
