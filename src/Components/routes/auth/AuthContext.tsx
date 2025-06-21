import { createContext, useContext, useState, type ReactNode } from "react";
import {
  AuthContextValue,
  AuthResponse,
  AuthStateValue,
} from "../../Types/Types";

const AuthContext = createContext<null | AuthContextValue>(null);

const initialContextValue: AuthStateValue = {
  accessToken: null,
  user: null,
};

const storageKey = "user";

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthStateValue>(() => {
    const fromStorage = localStorage.getItem(storageKey);
    if (!fromStorage) {
      return initialContextValue;
    }
    return JSON.parse(fromStorage);
  });

  function login(value: AuthResponse) {
    setAuth(value);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  function logout(path: string) {
    const accessToken = auth.accessToken;

    try {
      if (accessToken) {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          console.log("Session expired");
        } else {
          console.log("Manual logout");
        }
      }
    } catch (err) {
      console.error("Invalid token format", err);
    } finally {
      setAuth(initialContextValue);
      localStorage.removeItem(storageKey);
      window.location.href = path;
    }
  }

  const contextValue: AuthContextValue = {
    ...auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return ctx;
}
