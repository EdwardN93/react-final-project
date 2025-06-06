import { getAccessToken } from "../Login/utils";

export function logout(
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | string | null>>,
  navigate: (path: string) => void
) {
  const token = getAccessToken();

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const isExpired = payload.exp * 1000 < Date.now(); // Convert `exp` to ms
      if (isExpired) {
        console.log("Session expired");
      }
    } catch (e) {
      console.error("Invalid token", e);
    }
  }

  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  navigate("/login");
}
