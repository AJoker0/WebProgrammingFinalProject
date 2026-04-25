import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminRoute() {
  const { user } = useContext(AuthContext);

  // Если юзера нет или он не админ, отправляем его на главную страницу
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Если всё ок, рендерим вложенные страницы (Outlet)
  return <Outlet />;
}

export default AdminRoute;