import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthCheck } from '../auth/auth.check';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn, loading } = useAuthCheck();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;