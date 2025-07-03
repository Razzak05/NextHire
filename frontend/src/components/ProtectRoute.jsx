import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children, role }) => {
  const { userRole } = useSelector((state) => state.auth);
  if (!userRole || userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectRoute;
