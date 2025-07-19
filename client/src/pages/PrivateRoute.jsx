import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import React from "react";

const PrivateRoute = ({ children }) => {
  const { user, token } = useAuth();
  // Add a debug log:
  // console.log("PrivateRoute:", { user, token });
  return user && token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
