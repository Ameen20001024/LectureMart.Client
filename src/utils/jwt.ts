import { jwtDecode } from "jwt-decode";
import type { Role } from "../types/auth.ts";

interface JwtPayload {
  role?: string | string[];
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?:
    | string
    | string[];
}

export function getRolesFromToken(token: string): Role[] {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const roleClaim =
      decoded.role ??
      decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    if (!roleClaim) {
      return [];
    }

    const roles = Array.isArray(roleClaim)
      ? roleClaim
      : [roleClaim];

    return roles.filter(
      (role): role is Role =>
        role === "Student" ||
        role === "Mentor" ||
        role === "Admin"
    );
  } catch {
    return [];
  }
}