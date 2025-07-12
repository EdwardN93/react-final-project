import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthStateValue>(() => {
    const fromStorage = localStorage.getItem(storageKey);
    if (!fromStorage) return initialContextValue;

    const token = JSON.parse(fromStorage).accessToken;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) return initialContextValue;
    } catch {
      return initialContextValue;
    }

    return JSON.parse(fromStorage);
  });

  useEffect(() => {
    const fromStorage = localStorage.getItem(storageKey);
    if (fromStorage) {
      const token = JSON.parse(fromStorage).accessToken;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();

        if (isExpired) {
          toast("Sesiunea a expirat. Loghează-te din nou");
          logout();
          navigate("/login");
        }
      } catch {
        logout();
        navigate("/login");
      }
    }
  }, []);

  function login(value: AuthResponse) {
    setAuth(value);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  function logout() {
    setAuth(initialContextValue);
    localStorage.removeItem(storageKey);
    navigate("/login");
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
