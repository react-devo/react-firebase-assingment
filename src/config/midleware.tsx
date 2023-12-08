import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData') || "{}");
  if (!userData?.token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const userData  = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData?.token) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export { ProtectedRoute, Protected };