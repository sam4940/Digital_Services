import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;