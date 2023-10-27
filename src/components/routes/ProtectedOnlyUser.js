import React, { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedOnlyUser = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) {
    if (user.role !== "user") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedOnlyUser;
