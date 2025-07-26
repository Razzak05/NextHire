import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs.jsx";
import Browse from "./components/browse/Browse";
import Profile from "./components/Home/Profile";
import JobDetail from "./components/Job/JobDetail";
import Companies from "./components/admin/Companies";

// Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectRoute from "./protect/ProtectRoute";
import PublicRoute from "./protect/PublicRoute";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";

const AppRoutes = () => {
  return (
    <Routes>
      {/* User routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <UserLayout />
          </PublicRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="browse" element={<Browse />} />
        <Route
          path="profile"
          element={
            <ProtectRoute role="student">
              <Profile />
            </ProtectRoute>
          }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="description/:id" element={<JobDetail />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectRoute role="recruiter">
            <AdminLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<Companies />} />
        <Route path="companies/create" element={<CompanyCreate />} />
        <Route path="companies/update/:id" element={<CompanySetup />} />
        <Route path="jobs" element={<AdminJobs />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
