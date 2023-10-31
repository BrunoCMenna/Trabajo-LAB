import React, { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router";

const ProtectedOnlyUser = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user) {
    if (user.role !== "user" && user.role !== "disabled") {
      return <Navigate to="/productpanel" replace />;
    }
  }

  return children;
};

export default ProtectedOnlyUser;
