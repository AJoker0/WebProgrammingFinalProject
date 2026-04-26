import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminRoute() {
  const { user } = useContext(AuthContext);

  // Only admins can access nested routes.
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;