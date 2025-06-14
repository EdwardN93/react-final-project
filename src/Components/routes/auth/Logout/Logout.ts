import { getAccessToken } from "../Login/utils";

export function logout(
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | string | null>>,
  navigate: (path: string) => void,
  manualLogout = false // optional: true if user clicked logout
) {
  const token = getAccessToken();

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired || manualLogout) {
        console.log(isExpired ? "Session expired" : "Manual logout");

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (e) {
      console.error("Invalid token", e);
      // Log out anyway if the token can't be parsed
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate("/login");
    }
  } else if (manualLogout) {
    // No token but user clicked logout
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }
}
