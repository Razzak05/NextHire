import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  // If no user is logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires a role and it doesn't match
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectRoute;
