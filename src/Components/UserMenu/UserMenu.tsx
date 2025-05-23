import { useEffect, useState } from "react";
import { getAccessToken } from "../routes/auth/Login/utils";
export function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>();

  useEffect(() => {
    setIsLoggedIn(getAccessToken);
  }, []);

  console.log(isLoggedIn);

  return isLoggedIn ? (
    <div>
      <span>Account</span>
    </div>
  ) : (
    ""
  );
}
