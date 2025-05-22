import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { getAccessToken } from "../routes/auth/Login/utils";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>(
    localStorage.getItem("user")
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location]);

  return isLoggedIn ? (
    <nav className="text-center">
      <ul className="flex justify-start align-center text-gray-800">
        <li
          className="cursor-pointer hover:bg-gray-300 p-2 rounded"
          onClick={() => navigate("/register-car")}
        >
          Register new car
        </li>
      </ul>
    </nav>
  ) : (
    ""
  );
}

export default Navbar;
