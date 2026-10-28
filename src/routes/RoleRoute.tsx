import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types/auth.ts";

interface RoleRouteProps {
  allowedRoles: Role[];
}

export default function RoleRoute({
  allowedRoles,
}: RoleRouteProps) {
  const { user, activeProfile } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasAllowedRole = user.roles.some((role) =>
    allowedRoles.includes(role)
  );

  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!activeProfile || !allowedRoles.includes(activeProfile)) {
    return <Navigate to="/profiles" replace />;
  }

  return <Outlet />;
}
