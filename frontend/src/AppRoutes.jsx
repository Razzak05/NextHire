import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs.jsx";
import Browse from "./components/browse/Browse";
import Profile from "./components/Home/Profile";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import CommonLayout from "./layouts/CommonLayout";
import ProtectRoute from "./components/ProtectRoute";
import JobDetail from "./components/Job/JobDetail";

const AppRoutes = () => {
  return (
    <Routes>
      {/* public & common pages */}
      <Route element={<CommonLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="description/:id" element={<JobDetail />} />
      </Route>

      {/* protected user pages */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="browse" element={<Browse />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* admin-only pages */}
      <Route
        path="admin"
        element={
          <ProtectRoute role="admin">
            <AdminLayout />
          </ProtectRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
