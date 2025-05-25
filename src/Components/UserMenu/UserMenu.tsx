import { useEffect, useState } from "react";
import { getAccessToken } from "../routes/auth/Login/utils";
import { useLocation, useNavigate } from "react-router";
import { FaUser } from "react-icons/fa";

export function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = getAccessToken();
    setIsLoggedIn(!!token);
  }, [location]);

  return isLoggedIn ? (
    <div>
      <span
        className="text-sky-400 hover:text-sky-600 hover:cursor-pointer"
        onClick={() => navigate("/account")}
      >
        <FaUser />
      </span>
    </div>
  ) : null;
}
