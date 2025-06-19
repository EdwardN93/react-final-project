import { useNavigate } from "react-router";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";

export function useRedirectWhenLoggedIn(where: string = "/") {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate(where);
    }
  }, [user, navigate, where]);

  return Boolean(user);
}
