import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

const ManagerRoute = ({ children }) => {
  const { user, token } = useAuth();

  if (
    user &&
    token &&
    user.usermail === "thappa@gmail.com" &&
    user.password === "thappa"
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ManagerRoute;