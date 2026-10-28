import {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser, logoutUser } from "../services/auth.service";
import type { Role, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  activeProfile: Role | null;
  login: () => Promise<User>;
  logout: () => Promise<void>;
  switchProfile: (profile: Role) => void;
  refreshUser: () => Promise<User>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeProfile, setActiveProfile] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setActiveProfile((profile) =>
      (() => {
        const savedProfile = localStorage.getItem("lectureMartActiveProfile") as Role | null;
        const selectedProfile = profile ?? savedProfile;
        return selectedProfile && currentUser.roles.includes(selectedProfile)
          ? selectedProfile
          : currentUser.roles[0] ?? null;
      })(),
    );
    localStorage.setItem("lectureMartUser", JSON.stringify(currentUser));
    return currentUser;
  }, []);

  useEffect(() => {
    // This hydrates the authenticated session asynchronously from the current-user endpoint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser()
      .catch(() => {
        localStorage.removeItem("lectureMartUser");
        setUser(null);
        setActiveProfile(null);
      })
      .finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(() => refreshUser(), [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem("lectureMartUser");
      setUser(null);
      setActiveProfile(null);
    }
  }, []);

  const switchProfile = useCallback((profile: Role) => {
    if (user?.roles.includes(profile)) {
      setActiveProfile(profile);
      localStorage.setItem("lectureMartActiveProfile", profile);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      activeProfile,
      login,
      logout,
      switchProfile,
      refreshUser,
    }),
    [user, isLoading, activeProfile, login, logout, switchProfile, refreshUser],
  );

  return createElement(AuthContext.Provider, { value }, children);
}
