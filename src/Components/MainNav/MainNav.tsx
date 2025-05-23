import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

import { getAccessToken } from "../routes/auth/Login/utils";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState<string | boolean | null>();

  useEffect(() => {
    setIsLoggedIn(getAccessToken());
  }, [location]);

  return isLoggedIn ? (
    <nav className="text-center">
      <ul className="flex justify-start align-center text-gray-800">
        <li
          className="cursor-pointer bg-sky-300 transition hover:bg-sky-600 hover:text-white duration-300 p-2 rounded"
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
