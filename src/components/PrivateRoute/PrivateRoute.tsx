import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLogin } from 'utils';

interface PrivateRouteProps {
  redirectPath?: string;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = `/login?redirect=${location.pathname}`,
  children,
}) => {
  if (!isLogin()) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
