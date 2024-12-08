import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector((state: any) => state.user);

  if (!user || !user.access_token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
