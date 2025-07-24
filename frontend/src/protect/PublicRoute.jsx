import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user && user.role === "recruiter") {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default PublicRoute;
