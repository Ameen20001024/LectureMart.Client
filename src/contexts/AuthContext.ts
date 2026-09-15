import {
  createContext,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("lectureMartToken");
    const storedUser = localStorage.getItem("lectureMartUser");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;

        setToken(storedToken);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("lectureMartToken");
        localStorage.removeItem("lectureMartUser");
      }
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(
    (newToken: string, newUser: User) => {
      localStorage.setItem("lectureMartToken", newToken);
      localStorage.setItem(
        "lectureMartUser",
        JSON.stringify(newUser),
      );

      setToken(newToken);
      setUser(newUser);
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("lectureMartToken");
    localStorage.removeItem("lectureMartUser");

    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isLoading,
      login,
      logout,
    }),
    [user, token, isLoading, login, logout],
  );


  return createElement(
  AuthContext.Provider,
  { value },
  children,
);
}