import React, { useContext } from "react";
import { Navigate } from "react-router";

import { UserContext } from "../../contexts/AuthContext";

const ProtectedSysAdmin = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.role !== "sysadmin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedSysAdmin;
