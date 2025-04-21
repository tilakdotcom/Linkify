import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type CheckAuthProps = {
  children?: React.ReactNode;
  isAuthenticated: boolean;
  redirectPath?: string;
};

export const CheckAuthRoot = ({
  isAuthenticated,
  children,
  redirectPath,
}: CheckAuthProps) => {
  const location = useLocation();
  const { pathname } = location;
  const publicRoutes = ["/login", "/register", "/"];
  const isOnPublicRoute = publicRoutes.includes(pathname);
  const ShouldRedirectToLogin = !isAuthenticated && !isOnPublicRoute;
  const ShouldRedirectToHome = isAuthenticated && isOnPublicRoute;

  if (ShouldRedirectToLogin) {
    return <Navigate to={"/login"} state={{ from: pathname }} replace />;
  }

  if (ShouldRedirectToHome) {
    return <Navigate to={redirectPath || "/user"} replace />;
  }

  return <>{children}</>;
};

export const CheckAuth = ({
  isAuthenticated,
  redirectPath,
}: CheckAuthProps) => {
  return (
    <CheckAuthRoot
      isAuthenticated={isAuthenticated}
      redirectPath={redirectPath}
    >
      <Outlet />
    </CheckAuthRoot>
  );
};
