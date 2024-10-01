import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function AdminLayout({ user }) {
  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  const isAdmin = user.isAdmin;
  return <Outlet />;
}

export default AdminLayout;
